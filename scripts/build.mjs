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
const UI_TEXT = {
  en: {
    home: 'Home',
    channels: 'Channels',
    levels: 'Levels',
    topics: 'Topics',
    latest_lessons: 'Latest Lessons',
    start_listening: 'Start Listening',
    open_lesson: 'Open Lesson',
    watch_youtube: 'Watch on YouTube',
    about_lesson: 'About this lesson',
    study_area: 'Study Area',
    chinese: 'Chinese',
    pinyin: 'Pinyin',
    translation: 'Translation',
    vocabulary: 'Vocabulary',
    grammar_notes: 'Grammar Notes',
    display_translation: 'Display Translation',
    no_translation: 'No Translation',
    brand_tagline: 'Gentle stories for steady progress',
    channels_label: 'Channels / Learning language',
    primary_navigation: 'Primary navigation',
    learning_channels: 'Learning channels',
    channel_desc_chinese: 'Gentle Chinese listening practice for HSK learners.',
    channel_title_vi: 'Vietnamese Listening With Me',
    channel_desc_vi: 'Slow Vietnamese listening practice.',
    channel_title_ko: 'Korean Listening With Me',
    channel_desc_ko: 'Gentle Korean listening practice.',
    coming_soon: 'Coming soon',
    interface_language_label: 'Interface language',
    video_based_practice: 'Video-based listening practice',
    learn_chinese_gentle: 'Learn Chinese through gentle listening stories',
    hero_description: 'Slow, natural Chinese stories with transcript, pinyin, translation, vocabulary, and study notes.',
    view_latest_lesson: 'View latest lesson',
    site_purpose: 'This website helps YouTube viewers review each listening lesson with transcript, pinyin, translation, vocabulary, and grammar notes.',
    choose_lesson_hint: 'Choose a lesson, review the text, then continue listening on YouTube.',
    transcript_row: 'Transcript · Pinyin · Translation · Vocabulary',
    study_intro_text: 'Read, listen, compare pronunciation, and review notes at your own pace.',
    sample_translation_hello: 'Translation: Hello',
    sample_vocab_card: 'Vocabulary card: 你好 = hello',
    no_translation: 'No Translation'
  },
  vi: {
    home: 'Trang chủ',
    channels: 'Kênh học',
    levels: 'Trình độ',
    topics: 'Chủ đề',
    latest_lessons: 'Bài học mới nhất',
    start_listening: 'Bắt đầu nghe',
    open_lesson: 'Mở bài học',
    watch_youtube: 'Xem trên YouTube',
    about_lesson: 'Giới thiệu bài học',
    study_area: 'Khu vực học',
    chinese: 'Tiếng Trung',
    pinyin: 'Pinyin',
    translation: 'Bản dịch',
    vocabulary: 'Từ vựng',
    grammar_notes: 'Ghi chú ngữ pháp',
    display_translation: 'Hiển thị bản dịch',
    no_translation: 'Không hiển thị bản dịch',
    brand_tagline: 'Những câu chuyện nhẹ nhàng để tiến bộ đều đặn',
    channels_label: 'Kênh học / Ngôn ngữ học',
    primary_navigation: 'Điều hướng chính',
    learning_channels: 'Kênh học',
    channel_desc_chinese: 'Luyện nghe tiếng Trung nhẹ nhàng cho người học HSK.',
    channel_title_vi: 'Vietnamese Listening With Me',
    channel_desc_vi: 'Luyện nghe tiếng Việt chậm rãi.',
    channel_title_ko: 'Korean Listening With Me',
    channel_desc_ko: 'Luyện nghe tiếng Hàn nhẹ nhàng.',
    coming_soon: 'Sắp ra mắt',
    interface_language_label: 'Ngôn ngữ giao diện',
    video_based_practice: 'Luyện nghe qua video',
    learn_chinese_gentle: 'Học tiếng Trung qua những câu chuyện nghe nhẹ nhàng',
    hero_description: 'Những câu chuyện tiếng Trung chậm rãi, tự nhiên, có transcript, pinyin, bản dịch, từ vựng và ghi chú học tập.',
    view_latest_lesson: 'Xem bài mới nhất',
    site_purpose: 'Website này giúp người xem YouTube ôn lại từng bài nghe với transcript, pinyin, bản dịch, từ vựng và ghi chú ngữ pháp.',
    choose_lesson_hint: 'Chọn một bài học, xem lại nội dung, rồi tiếp tục luyện nghe trên YouTube.',
    transcript_row: 'Transcript · Pinyin · Bản dịch · Từ vựng',
    study_intro_text: 'Đọc, nghe, so sánh phát âm và ôn lại ghi chú theo tốc độ của bạn.',
    sample_translation_hello: 'Bản dịch: Xin chào',
    sample_vocab_card: 'Thẻ từ vựng: 你好 = xin chào',
    no_translation: 'Không hiện bản dịch'
  }
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
    return `<section class="card lesson-section" data-section="${key}"><h2 data-i18n="${key}">${SECTION_LABELS[key]}</h2>${renderSectionBody(content)}</section>`;
  }).join('');

  const translationSelector = `<section class="card lesson-section translation-controls"><h2 data-i18n="display_translation">Display Translation</h2><div class="translation-switch" role="radiogroup" aria-label="Display translation language"><label><input type="radio" name="translation" value="english"> English</label><label><input type="radio" name="translation" value="vietnamese"> Vietnamese</label><label><input type="radio" name="translation" value="none" data-i18n-radio-none="true"> No Translation</label></div></section>`;

  const translationSections = ['english', 'vietnamese'].map((key) => {
    const content = sections[key] || '<p class="missing">(Content missing)</p>';
    return `<section class="card lesson-section translation-section" data-translation="${key}"><h2 data-i18n="translation">${SECTION_LABELS[key]}</h2>${renderSectionBody(content)}</section>`;
  }).join('');

  return `${translationSelector}${fixedSections}${translationSections}`;
}

function validateLesson(meta, body, fileName) {
  for (const key of REQUIRED_FRONTMATTER) if (!meta[key]) throw new Error(`${fileName}: thiếu frontmatter "${key}".`);
  const sections = parseSections(body);
  for (const key of REQUIRED_SECTIONS) if (!sections[key]) throw new Error(`${fileName}: thiếu section "## ${key}".`);
}

function renderPage(title, content, { assetPath = './', homePath = './' } = {}) {
  const replacements = {
    title,
    assetPath,
    homePath,
    content
  };

  const html = baseTemplate.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (Object.prototype.hasOwnProperty.call(replacements, key)) return replacements[key];
    return match;
  });

  const unresolved = html.match(/\{\{\w+\}\}/g);
  if (unresolved) {
    throw new Error(`Template placeholders chưa được render: ${[...new Set(unresolved)].join(', ')}`);
  }

  return html;
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

    const top = `<article class="lesson-hero card"><div><p class="badge">${meta.hsk}</p><h1>${meta.title}</h1><p class="lesson-summary">${meta.summary}</p></div><section class="lesson-overview" aria-label="${SECTION_LABELS.video_description}"><h2 data-i18n="about_lesson">${SECTION_LABELS.video_description}</h2>${renderSectionBody(sections.video_description)}</section><p><a class="btn" href="${meta.youtube}" target="_blank" rel="noreferrer" data-i18n="watch_youtube">Watch on YouTube</a></p></article><section class="study-intro card"><h2 data-i18n="study_area">Study Area</h2><p data-i18n="study_intro_text">Read, listen, compare pronunciation, and review notes at your own pace.</p></section>`;
    const script = `<script>(function(){const ui=${JSON.stringify(UI_TEXT)};const isLesson=Boolean(document.querySelector('.translation-controls'));const langSelect=document.getElementById('interface-language');const savedLang=localStorage.getItem('interfaceLanguage')||'en';function applyLang(lang){const selected=ui[lang]?lang:'en';document.documentElement.lang=selected;document.querySelectorAll('[data-i18n]').forEach((el)=>{const key=el.dataset.i18n;if(ui[selected][key])el.textContent=ui[selected][key];});document.querySelectorAll('[data-i18n-aria-label]').forEach((el)=>{const key=el.dataset.i18nAriaLabel;if(ui[selected][key])el.setAttribute('aria-label',ui[selected][key]);});const noneLabel=document.querySelector('[data-i18n-radio-none]');if(noneLabel)noneLabel.parentElement.lastChild.textContent=' '+ui[selected].no_translation;langSelect.value=selected;}if(langSelect){langSelect.value=savedLang;langSelect.addEventListener('change',(e)=>{localStorage.setItem('interfaceLanguage',e.target.value);applyLang(e.target.value);if(isLesson&&!localStorage.getItem('lessonTranslation')){setDefaultTranslation(e.target.value);}});}const radios=document.querySelectorAll('input[name=\"translation\"]');const sections=document.querySelectorAll('.translation-section');function renderTranslation(mode){sections.forEach((section)=>{section.hidden=section.dataset.translation!==mode||mode==='none';});radios.forEach((r)=>{r.checked=r.value===mode;});if(isLesson)localStorage.setItem('lessonTranslation',mode);}function setDefaultTranslation(lang){const mode=lang==='vi'?'vietnamese':'english';renderTranslation(mode);}if(isLesson){const savedTranslation=localStorage.getItem('lessonTranslation');if(savedTranslation){renderTranslation(savedTranslation);}else{setDefaultTranslation(savedLang);}radios.forEach((radio)=>radio.addEventListener('change',()=>renderTranslation(radio.value)));}applyLang(savedLang);})();</script>`;

    const html = renderPage(meta.title, top + toHtmlSections(body) + script, { assetPath: `${SITE_BASE}/`, homePath: `${SITE_BASE}/` });
    fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf8');
    lessons.push({ ...meta, url: `${SITE_BASE}/lessons/${meta.slug}/` });
  }

  const list = lessons
    .slice(0, 1)
    .map((x) => `<article class="card lesson-card"><p class="badge">${x.hsk}</p><h2>${x.title}</h2><p class="summary">${x.summary}</p><p class="meta-row" data-i18n="transcript_row">Transcript · Pinyin · Translation · Vocabulary</p><a class="btn btn-secondary" href="${x.url}" data-i18n="open_lesson">Open Lesson</a></article>`)
    .join('');

  const firstLessonUrl = lessons[0] ? lessons[0].url : '#';
  const homeContent = `<section class="home-hero card"><div><p class="badge" data-i18n="video_based_practice">Video-based listening practice</p><h1 class="hero-title" data-i18n="learn_chinese_gentle">Learn Chinese through gentle listening stories</h1><p class="hero-description" data-i18n="hero_description">Slow, natural Chinese stories with transcript, pinyin, translation, vocabulary, and study notes.</p><div class="hero-actions"><a class="btn" href="${firstLessonUrl}" data-i18n="start_listening">Start Listening</a><a class="btn-text" href="#latest-lessons" data-i18n="view_latest_lesson">View latest lesson</a></div><p class="purpose-text" data-i18n="site_purpose">This website helps YouTube viewers review each listening lesson with transcript, pinyin, translation, vocabulary, and grammar notes.</p></div><div class="hero-visual"><span class="blob a"></span><span class="blob b"></span><div class="study-card"><h3>你好</h3><p class="pinyin">nǐ hǎo</p><p data-i18n="sample_translation_hello">Translation: Hello</p><p class="vocab-chip" data-i18n="sample_vocab_card">Vocabulary card: 你好 = hello</p><p class="hsk-chip">HSK 1</p></div></div></section><section id="latest-lessons" class="latest-lessons card"><h2 data-i18n="latest_lessons">Latest Lessons</h2><p class="section-subtitle" data-i18n="choose_lesson_hint">Choose a lesson, review the text, then continue listening on YouTube.</p><div class="lesson-grid">${list}</div></section><script>(function(){const ui=${JSON.stringify(UI_TEXT)};const langSelect=document.getElementById('interface-language');const savedLang=localStorage.getItem('interfaceLanguage')||'en';const channelDetails=document.querySelector('.channels-dropdown');function applyLang(lang){const selected=ui[lang]?lang:'en';document.documentElement.lang=selected;document.querySelectorAll('[data-i18n]').forEach((el)=>{const key=el.dataset.i18n;if(ui[selected][key])el.textContent=ui[selected][key];});document.querySelectorAll('[data-i18n-aria-label]').forEach((el)=>{const key=el.dataset.i18nAriaLabel;if(ui[selected][key])el.setAttribute('aria-label',ui[selected][key]);});langSelect.value=selected;}langSelect.value=savedLang;langSelect.addEventListener('change',(e)=>{localStorage.setItem('interfaceLanguage',e.target.value);applyLang(e.target.value);});if(channelDetails){channelDetails.querySelector('summary').addEventListener('click',(e)=>{if(window.matchMedia('(max-width: 820px)').matches){e.preventDefault();channelDetails.open=!channelDetails.open;}});}applyLang(savedLang);})();</script>`;
  const home = renderPage('Listening Chinese With Me', homeContent, { assetPath: `${SITE_BASE}/`, homePath: `${SITE_BASE}/` });
  fs.writeFileSync(path.join(distDir, 'index.html'), home, 'utf8');
}

build();
