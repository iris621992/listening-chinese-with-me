import fs from 'fs';
import path from 'path';

const root = process.cwd();
const contentDir = path.join(root, 'content/lessons');
const distDir = path.join(root, 'dist');
const baseTemplate = fs.readFileSync(path.join(root, 'templates/base.html'), 'utf8');

const SITE_BASE = '/listening-chinese-with-me';

const REQUIRED_FRONTMATTER = ['title', 'slug', 'hsk', 'youtube', 'summary'];
const REQUIRED_SECTIONS = ['chinese', 'pinyin', 'vietnamese', 'english', 'vocabulary', 'grammar_notes', 'video_description', 'pinned_comment', 'thumbnail_idea', 'image_timeline'];
const STUDY_SECTIONS = ['chinese', 'pinyin', 'vocabulary', 'grammar_notes'];

const SECTION_LABELS = {
  chinese: 'Chinese',
  pinyin: 'Pinyin',
  vietnamese: 'Vietnamese',
  english: 'English',
  vocabulary: 'Vocabulary',
  grammar_notes: 'Grammar Notes',
  video_description: 'About this lesson'
};

const ensure = (p) => fs.mkdirSync(p, { recursive: true });
const clean = (p) => fs.rmSync(p, { recursive: true, force: true });

function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error('Markdown thiếu frontmatter.');
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > -1) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: m[2] };
}

function parseSections(md) {
  const sections = {};
  const chunks = md.split('\n## ');
  for (let i = 1; i < chunks.length; i += 1) {
    const [heading, ...rest] = chunks[i].split('\n');
    sections[heading.trim().toLowerCase()] = rest.join('\n').trim();
  }
  return sections;
}

function renderSectionBody(raw) {
  const lines = raw.split('\n');
  let html = '';
  let inList = false;

  for (const line of lines) {
    if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${line.slice(2)}</li>`;
      continue;
    }

    if (line.trim() === '') {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
      continue;
    }

    if (inList) {
      html += '</ul>';
      inList = false;
    }
    html += `<p>${line}</p>`;
  }

  if (inList) html += '</ul>';
  return html;
}

function toHtmlSections(md) {
  const sections = parseSections(md);

  const fixedSections = STUDY_SECTIONS.map((key) => {
    const content = sections[key] || '<p class="missing">(Content missing)</p>';
    return `<section class="card lesson-section" data-section="${key}"><h2>${SECTION_LABELS[key]}</h2>${renderSectionBody(content)}</section>`;
  }).join('');

  const translationSelector = `<section class="card lesson-section translation-controls"><h2>Display Translation</h2><div class="translation-switch" role="radiogroup" aria-label="Display translation language"><label><input type="radio" name="translation" value="english" checked> English</label><label><input type="radio" name="translation" value="vietnamese"> Vietnamese</label><label><input type="radio" name="translation" value="none"> No Translation</label></div></section>`;

  const translationSections = ['english', 'vietnamese'].map((key) => {
    const content = sections[key] || '<p class="missing">(Content missing)</p>';
    return `<section class="card lesson-section translation-section" data-translation="${key}"><h2>${SECTION_LABELS[key]}</h2>${renderSectionBody(content)}</section>`;
  }).join('');

  return `${translationSelector}${fixedSections}${translationSections}`;
}

function validateLesson(meta, body, fileName) {
  for (const key of REQUIRED_FRONTMATTER) if (!meta[key]) throw new Error(`${fileName}: thiếu frontmatter "${key}".`);
  const sections = parseSections(body);
  for (const key of REQUIRED_SECTIONS) if (!sections[key]) throw new Error(`${fileName}: thiếu section "## ${key}".`);
}

function renderPage(title, content, { assetPath = './', homePath = './' } = {}) {
  return baseTemplate.replace('{{title}}', title).replace('{{assetPath}}', assetPath).replace('{{homePath}}', homePath).replace('{{content}}', content);
}

function copyAssets() {
  ensure(path.join(distDir, 'assets/css'));
  fs.copyFileSync(path.join(root, 'src/assets/css/style.css'), path.join(distDir, 'assets/css/style.css'));
}

function build() {
  clean(distDir);
  ensure(distDir);
  copyAssets();

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  const lessons = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    validateLesson(meta, body, file);

    const sections = parseSections(body);
    const pageDir = path.join(distDir, 'lessons', meta.slug);
    ensure(pageDir);

    const top = `<article class="lesson-hero card"><div><p class="badge">${meta.hsk}</p><h1>${meta.title}</h1><p class="lesson-summary">${meta.summary}</p></div><section class="lesson-overview" aria-label="${SECTION_LABELS.video_description}"><h2>${SECTION_LABELS.video_description}</h2>${renderSectionBody(sections.video_description)}</section><p><a class="btn" href="${meta.youtube}" target="_blank" rel="noreferrer">Watch on YouTube</a></p></article><section class="study-intro card"><h2>Study Area</h2><p>Read, listen, compare pronunciation, and review notes at your own pace.</p></section>`;
    const script = `<script>(function(){const radios=document.querySelectorAll('input[name="translation"]');const sections=document.querySelectorAll('.translation-section');function renderTranslation(mode){sections.forEach((section)=>{section.hidden = section.dataset.translation !== mode || mode === 'none';});}radios.forEach((radio)=>radio.addEventListener('change',()=>renderTranslation(radio.value)));renderTranslation('english');})();</script>`;

    const html = renderPage(meta.title, top + toHtmlSections(body) + script, { assetPath: `${SITE_BASE}/`, homePath: `${SITE_BASE}/` });
    fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf8');
    lessons.push({ ...meta, url: `${SITE_BASE}/lessons/${meta.slug}/` });
  }

  const list = lessons
    .map((x) => `<article class="card lesson-card"><p class="badge">${x.hsk}</p><h2>${x.title}</h2><p class="summary">${x.summary}</p><a class="btn btn-secondary" href="${x.url}">Open Lesson</a></article>`)
    .join('');

  const firstLessonUrl = lessons[0] ? lessons[0].url : '#';
  const homeContent = `<section class="home-hero card"><p class="hero-kicker">Soft postcard style</p><h1>Listening Chinese With Me</h1><p class="hero-subtitle">Gentle Chinese listening practice for HSK learners.</p><p class="hero-description">Slow, natural Chinese stories with transcript, pinyin, translation, vocabulary, and study notes.</p><a class="btn" href="${firstLessonUrl}">Start Listening</a></section><section class="latest-lessons"><h2>Latest Lessons</h2><div class="lesson-grid">${list}</div></section>`;
  const home = renderPage('Listening Chinese With Me', homeContent, { assetPath: `${SITE_BASE}/`, homePath: `${SITE_BASE}/` });
  fs.writeFileSync(path.join(distDir, 'index.html'), home, 'utf8');
}

build();
