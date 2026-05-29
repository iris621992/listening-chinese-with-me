import fs from 'fs';
import path from 'path';

const root = process.cwd();
const contentDir = path.join(root, 'content/lessons');
const distDir = path.join(root, 'dist');
const baseTemplate = fs.readFileSync(path.join(root, 'templates/base.html'), 'utf8');

const SITE_BASE = '/listening-chinese-with-me';

const REQUIRED_FRONTMATTER = ['title', 'slug', 'hsk', 'summary'];
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
    languages: 'Languages',
    how_it_works: 'How it works',
    latest_lessons: 'Latest Lessons',
    choose_language: 'Choose a language',
    start_chinese: 'Start with Chinese',
    open_lesson: 'Open Lesson',
    watch_youtube: 'Watch on YouTube',
    about_lesson: 'About this lesson',
    study_area: 'Study Area',
    chinese: 'Chinese',
    pinyin: 'Pinyin',
    translation: 'Translation',
    vocabulary: 'Vocabulary',
    grammar_notes: 'Grammar Notes',
    display_translation: 'Lesson Translation',
    no_translation: 'No Translation',
    brand_tagline: 'Gentle stories for steady progress',
    primary_navigation: 'Primary navigation',
    learning_channels: 'Learning channels',
    interface_language_label: 'Interface Language',
    hero_title: 'Learn languages through gentle listening stories',
    hero_description: 'A calm listening practice library for language learners. Choose a language, listen to natural stories, and review each lesson with transcript, pronunciation, translation, vocabulary, and study notes.',
    choose_language_heading: 'Choose your learning language',
    chinese_card_desc: 'Gentle Chinese listening practice for HSK learners.',
    available: 'Available',
    enter_chinese_library: 'Enter Chinese Library',
    coming_soon: 'Coming soon',
    how_title: 'How it works',
    layer1_title: 'Languages / Learning language',
    layer1_desc: 'Choose the language channel you want to study.',
    layer2_title: 'Interface Language',
    layer2_desc: 'Choose English or Vietnamese for the website UI.',
    layer3_title: 'Lesson Translation',
    layer3_desc: 'Choose English, Vietnamese, or No Translation inside each lesson.',
    chinese_library_title: 'Listening Chinese With Me',
    chinese_library_desc: 'Chinese listening stories with transcript, pronunciation, translation, vocabulary, and study notes.',
    browse_chinese: 'Browse Chinese lessons',
    transcript_row: 'Transcript · Pinyin · Translation · Vocabulary',
    transcript: 'Transcript',
    subtitle: 'Transcript',
    shadowing: 'Shadowing',
    pronunciation: 'Pronunciation',
    dictation: 'Dictation',
    summary_tab: 'Summary'
  },
  vi: {
    home: 'Trang chủ',
    languages: 'Ngôn ngữ',
    how_it_works: 'Cách hoạt động',
    latest_lessons: 'Bài học mới nhất',
    choose_language: 'Chọn ngôn ngữ',
    start_chinese: 'Bắt đầu với tiếng Trung',
    open_lesson: 'Mở bài học',
    watch_youtube: 'Xem trên YouTube',
    about_lesson: 'Giới thiệu bài học',
    study_area: 'Khu vực học',
    chinese: 'Tiếng Trung',
    pinyin: 'Pinyin',
    translation: 'Bản dịch',
    vocabulary: 'Từ vựng',
    grammar_notes: 'Ghi chú ngữ pháp',
    display_translation: 'Bản dịch bài học',
    no_translation: 'Không hiển thị bản dịch',
    brand_tagline: 'Những câu chuyện nhẹ nhàng để tiến bộ đều đặn',
    primary_navigation: 'Điều hướng chính',
    learning_channels: 'Kênh học',
    interface_language_label: 'Ngôn ngữ giao diện',
    hero_title: 'Học ngôn ngữ qua những câu chuyện nghe nhẹ nhàng',
    hero_description: 'Thư viện luyện nghe nhẹ nhàng dành cho người học ngôn ngữ. Chọn ngôn ngữ, nghe những câu chuyện tự nhiên, và ôn lại từng bài với transcript, phát âm, bản dịch, từ vựng và ghi chú học tập.',
    choose_language_heading: 'Chọn ngôn ngữ bạn muốn học',
    chinese_card_desc: 'Luyện nghe tiếng Trung nhẹ nhàng cho người học HSK.',
    available: 'Đang có sẵn',
    enter_chinese_library: 'Vào thư viện tiếng Trung',
    coming_soon: 'Sắp ra mắt',
    how_title: 'Cách hoạt động',
    layer1_title: 'Ngôn ngữ học / Kênh học',
    layer1_desc: 'Chọn kênh ngôn ngữ mà bạn muốn học.',
    layer2_title: 'Ngôn ngữ giao diện',
    layer2_desc: 'Chọn English hoặc Tiếng Việt cho giao diện website.',
    layer3_title: 'Bản dịch bài học',
    layer3_desc: 'Chọn English, Vietnamese hoặc Không hiển thị bản dịch trong từng bài.',
    chinese_library_title: 'Listening Chinese With Me',
    chinese_library_desc: 'Các bài nghe tiếng Trung có transcript, phát âm, bản dịch, từ vựng và ghi chú học tập.',
    browse_chinese: 'Xem bài học tiếng Trung',
    transcript_row: 'Transcript · Pinyin · Bản dịch · Từ vựng',
    transcript: 'Phụ đề',
    subtitle: 'Phụ đề',
    shadowing: 'Shadowing',
    pronunciation: 'Phát âm',
    dictation: 'Chính tả',
    summary_tab: 'Tóm tắt'
  }
};

const ensure = (p) => fs.mkdirSync(p, { recursive: true });
const clean = (p) => fs.rmSync(p, { recursive: true, force: true });

function parseFrontmatter(raw) { const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/); if (!m) throw new Error('Markdown thiếu frontmatter.'); const meta = {}; for (const line of m[1].split('\n')) { const i = line.indexOf(':'); if (i > -1) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim(); } return { meta, body: m[2] }; }
function parseSections(md) { const sections = {}; const chunks = md.split('\n## '); for (let i = 1; i < chunks.length; i += 1) { const [heading, ...rest] = chunks[i].split('\n'); sections[heading.trim().toLowerCase()] = rest.join('\n').trim(); } return sections; }

function extractYouTubeId(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') {
      const id = parsed.pathname.replace(/^\//, '').split('/')[0];
      return id || null;
    }
    if (parsed.hostname === 'www.youtube.com' || parsed.hostname === 'youtube.com') {
      if (parsed.pathname === '/watch') {
        return parsed.searchParams.get('v');
      }
    }
  } catch (e) {
    return null;
  }
  return null;
}

function toYouTubeEmbedUrl(url) {
  const id = extractYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

function renderSectionBody(raw) { const lines = raw.split('\n'); let html = ''; let inList = false; for (const line of lines) { if (line.startsWith('- ')) { if (!inList) { html += '<ul>'; inList = true; } html += `<li>${line.slice(2)}</li>`; continue; } if (line.trim() === '') { if (inList) { html += '</ul>'; inList = false; } continue; } if (inList) { html += '</ul>'; inList = false; } html += `<p>${line}</p>`; } if (inList) html += '</ul>'; return html; }

function splitLocalizedSection(raw) {
  const buckets = { en: '', vi: '' };
  let currentLang = null;
  let foundLocalizedLabel = false;

  for (const line of raw.replace(/\r/g, '').split('\n')) {
    const languageLabel = line.trim().match(/^(EN|VI):\s*$/i);
    if (languageLabel) {
      currentLang = languageLabel[1].toLowerCase();
      foundLocalizedLabel = true;
      continue;
    }

    if (currentLang) {
      buckets[currentLang] = `${buckets[currentLang]}${line}\n`;
    }
  }

  if (!foundLocalizedLabel) return { en: raw.trim(), vi: raw.trim() };

  return {
    en: buckets.en.trim(),
    vi: (buckets.vi.trim() || buckets.en.trim())
  };
}

function renderLocalizedSectionBody(raw) {
  const localized = splitLocalizedSection(raw);
  return ['en', 'vi']
    .map((lang) => `<div data-localized-content="${lang}"${lang === 'vi' ? ' hidden' : ''}>${renderSectionBody(localized[lang] || localized.en || '')}</div>`)
    .join('');
}

function sentenceSplitChinese(raw) {
  return raw
    .replace(/\r/g, '')
    .split(/(?<=[。！？!?])/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function renderTranscriptLines(raw) {
  const lines = sentenceSplitChinese(raw);
  if (!lines.length) return '<p class="missing">(Content missing)</p>';
  return lines
    .map((line, index) => `<li><span class="transcript-cue" aria-hidden="true">▶</span><span class="transcript-line-text">${line}</span><span class="sr-only">Line ${index + 1}</span></li>`)
    .join('');
}

function renderStudyPlayer({ meta, sections, youtubeEmbed, youtubeWatchButton }) {
  const videoBlock = youtubeEmbed
    ? `<div class="lesson-video-frame"><iframe src="${youtubeEmbed}" title="${meta.title} - YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>${youtubeWatchButton}`
    : '<div class="lesson-video-frame lesson-video-placeholder"><p>Video coming soon</p></div>';
  const summaryBody = renderLocalizedSectionBody(sections.video_description || '');
  return `<section class="study-player-layout lesson-page-block card" aria-label="Video study player"><div class="study-mode-tabs" role="tablist" aria-label="Study modes"><button type="button" id="study-tab-shadowing" class="study-mode-tab is-active" role="tab" aria-selected="true" aria-controls="study-panel-shadowing" data-study-tab="shadowing" data-i18n="shadowing">Shadowing</button><button type="button" id="study-tab-pronunciation" class="study-mode-tab" role="tab" aria-selected="false" aria-controls="study-panel-pronunciation" data-study-tab="pronunciation" data-i18n="pronunciation">Pronunciation</button><button type="button" id="study-tab-dictation" class="study-mode-tab" role="tab" aria-selected="false" aria-controls="study-panel-dictation" data-study-tab="dictation" data-i18n="dictation">Dictation</button><button type="button" id="study-tab-summary" class="study-mode-tab" role="tab" aria-selected="false" aria-controls="study-panel-summary" data-study-tab="summary" data-i18n="summary_tab">Summary</button></div><div id="study-panel-shadowing" class="study-tab-panel" role="tabpanel" aria-labelledby="study-tab-shadowing" data-study-panel="shadowing"><div class="study-player-grid"><div class="study-video-column"><section class="lesson-video" aria-label="Lesson video">${videoBlock}</section></div><aside class="transcript-panel" aria-label="Transcript"><div class="transcript-panel-header"><h2 data-i18n="transcript">Transcript</h2><span>${meta.hsk}</span></div><ol class="transcript-lines">${renderTranscriptLines(sections.chinese || '')}</ol></aside></div></div><div id="study-panel-pronunciation" class="study-tab-panel study-placeholder-panel" role="tabpanel" aria-labelledby="study-tab-pronunciation" data-study-panel="pronunciation" hidden><p data-i18n="coming_soon">Coming soon</p></div><div id="study-panel-dictation" class="study-tab-panel study-placeholder-panel" role="tabpanel" aria-labelledby="study-tab-dictation" data-study-panel="dictation" hidden><p data-i18n="coming_soon">Coming soon</p></div><div id="study-panel-summary" class="study-tab-panel study-summary-panel" role="tabpanel" aria-labelledby="study-tab-summary" data-study-panel="summary" hidden><section id="lesson-summary-tab" aria-label="${SECTION_LABELS.video_description}"><h2 data-i18n="about_lesson">${SECTION_LABELS.video_description}</h2>${summaryBody}</section></div></section>`;
}

function toHtmlSections(md) {
  const sections = parseSections(md);
  const fixedSections = STUDY_SECTIONS.map((key) => `<section id="content-${key}" class="card lesson-section lesson-page-block" data-section="${key}"><h2 data-i18n="${key}">${SECTION_LABELS[key]}</h2>${renderSectionBody(sections[key] || '<p class="missing">(Content missing)</p>')}</section>`).join('');
  const translationSelector = `<section id="content-translation" class="card lesson-section lesson-page-block translation-controls"><h2 data-i18n="display_translation">Lesson Translation</h2><div class="translation-switch" role="radiogroup" aria-label="Display translation language"><label><input type="radio" name="translation" value="english"> English</label><label><input type="radio" name="translation" value="vietnamese"> Vietnamese</label><label><input type="radio" name="translation" value="none" data-i18n-radio-none="true"> No Translation</label></div></section>`;
  const translationSections = ['english', 'vietnamese'].map((key) => `<section class="card lesson-section lesson-page-block translation-section" data-translation="${key}"><h2 data-i18n="translation">${SECTION_LABELS[key]}</h2>${renderSectionBody(sections[key] || '<p class="missing">(Content missing)</p>')}</section>`).join('');
  const contentTabs = `<nav class="content-tabs" aria-label="Lesson content tabs"><a class="content-tab is-active" href="#content-chinese" data-i18n="transcript">Transcript</a><a class="content-tab" href="#content-translation" data-i18n="translation">Translation</a><a class="content-tab" href="#content-vocabulary" data-i18n="vocabulary">Vocabulary</a><a class="content-tab" href="#content-grammar_notes" data-i18n="grammar_notes">Grammar Notes</a></nav>`;
  return `<div class="lesson-shell lesson-content-flow">${contentTabs}${fixedSections}${translationSelector}${translationSections}</div>`;
}

function validateLesson(meta, body, fileName) { for (const key of REQUIRED_FRONTMATTER) if (!meta[key]) throw new Error(`${fileName}: thiếu frontmatter "${key}".`); const sections = parseSections(body); for (const key of REQUIRED_SECTIONS) if (!sections[key]) throw new Error(`${fileName}: thiếu section "## ${key}".`); }
function renderPage(title, content, { assetPath = './', homePath = './' } = {}) { return baseTemplate.replace(/\{\{(\w+)\}\}/g, (m, key) => ({ title, assetPath, homePath, content }[key] ?? m)); }
function copyAssets() { ensure(path.join(distDir, 'assets/css')); fs.copyFileSync(path.join(root, 'src/assets/css/style.css'), path.join(distDir, 'assets/css/style.css')); }

function baseScript(isLesson) {
  return `<script>(function(){const ui=${JSON.stringify(UI_TEXT)};const langSelect=document.getElementById('interface-language');const savedLang=localStorage.getItem('interfaceLanguage')||'en';function applyLang(lang){const selected=ui[lang]?lang:'en';document.documentElement.lang=selected;document.querySelectorAll('[data-i18n]').forEach((el)=>{const key=el.dataset.i18n;if(ui[selected][key])el.textContent=ui[selected][key];});document.querySelectorAll('[data-localized-content]').forEach((el)=>{el.hidden=el.dataset.localizedContent!==selected;});const noneLabel=document.querySelector('[data-i18n-radio-none]');if(noneLabel)noneLabel.parentElement.lastChild.textContent=' '+ui[selected].no_translation;if(langSelect)langSelect.value=selected;}function initStudyTabs(){const tabs=document.querySelectorAll('[data-study-tab]');const panels=document.querySelectorAll('[data-study-panel]');if(!tabs.length||!panels.length)return;function activate(mode){tabs.forEach((tab)=>{const active=tab.dataset.studyTab===mode;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));});panels.forEach((panel)=>{panel.hidden=panel.dataset.studyPanel!==mode;});}tabs.forEach((tab)=>tab.addEventListener('click',()=>activate(tab.dataset.studyTab)));activate('shadowing');}if(langSelect){langSelect.addEventListener('change',(e)=>{localStorage.setItem('interfaceLanguage',e.target.value);applyLang(e.target.value);if(${isLesson}&&!localStorage.getItem('lessonTranslation')){setDefaultTranslation(e.target.value);}});}const radios=document.querySelectorAll('input[name="translation"]');const sections=document.querySelectorAll('.translation-section');function renderTranslation(mode){sections.forEach((section)=>{section.hidden=section.dataset.translation!==mode||mode==='none';});radios.forEach((r)=>{r.checked=r.value===mode;});if(${isLesson})localStorage.setItem('lessonTranslation',mode);}function setDefaultTranslation(lang){renderTranslation(lang==='vi'?'vietnamese':'english');}if(${isLesson}){initStudyTabs();const saved=localStorage.getItem('lessonTranslation');if(saved){renderTranslation(saved);}else{setDefaultTranslation(savedLang);}radios.forEach((radio)=>radio.addEventListener('change',()=>renderTranslation(radio.value)));}applyLang(savedLang);})();</script>`;
}

function build() {
  clean(distDir); ensure(distDir); copyAssets();
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md')); const lessons = [];
  for (const file of files) {
    const { meta, body } = parseFrontmatter(fs.readFileSync(path.join(contentDir, file), 'utf8')); validateLesson(meta, body, file);
    const sections = parseSections(body); const pageDir = path.join(distDir, 'lessons', meta.slug); ensure(pageDir);
    const youtubeEmbed = toYouTubeEmbedUrl(meta.youtube);
    const youtubeWatchButton = meta.youtube
      ? `<p class="lesson-video-actions"><a class="btn" href="${meta.youtube}" target="_blank" rel="noreferrer" data-i18n="watch_youtube">Watch on YouTube</a></p>`
      : '';
    const studyPlayer = renderStudyPlayer({ meta, sections, youtubeEmbed, youtubeWatchButton });
    const top = `<div class="lesson-shell lesson-content-flow lesson-top-flow"><article class="lesson-hero lesson-page-block card"><p class="badge">${meta.hsk}</p><div><h1>${meta.title}</h1><p class="lesson-summary">${meta.summary}</p></div></article>${studyPlayer}<section class="study-intro lesson-page-block card"><h2 data-i18n="study_area">Study Area</h2></section></div>`;
    fs.writeFileSync(path.join(pageDir, 'index.html'), renderPage(meta.title, top + toHtmlSections(body) + baseScript(true), { assetPath: `${SITE_BASE}/`, homePath: SITE_BASE }), 'utf8');
    lessons.push({ ...meta, url: `${SITE_BASE}/lessons/${meta.slug}/` });
  }

  const list = lessons.slice(0, 1).map((x) => `<article class="card lesson-card"><p class="badge">${x.hsk}</p><h2>${x.title}</h2><p class="summary">${x.summary}</p><p class="meta-row" data-i18n="transcript_row">Transcript · Pinyin · Translation · Vocabulary</p><a class="btn btn-secondary" href="${x.url}" data-i18n="open_lesson">Open Lesson</a></article>`).join('');
  const homeContent = `<div class="wide-shell page-flow"><section class="home-hero card"><div><h1 class="hero-title" data-i18n="hero_title">Learn languages through gentle listening stories</h1><p class="hero-description" data-i18n="hero_description">A calm listening practice library for language learners...</p><div class="hero-actions"><a class="btn" href="#languages" data-i18n="choose_language">Choose a language</a><a class="btn-text" href="${SITE_BASE}/chinese/" data-i18n="start_chinese">Start with Chinese</a></div></div><div class="hero-visual" aria-hidden="true"><span class="blob a"></span><span class="blob b"></span><div class="study-card"><p class="badge">HSK 1</p><h3>听故事</h3><p class="pinyin">tīng gùshi</p><p>Listen first, then review transcript, translation, vocabulary, and notes.</p><span class="vocab-chip">slow listening</span></div></div></section><section id="languages" class="latest-lessons card"><h2 data-i18n="choose_language_heading">Choose your learning language</h2><div class="language-grid"><article class="card language-card"><h3>Chinese Listening With Me</h3><p data-i18n="chinese_card_desc">Gentle Chinese listening practice for HSK learners.</p><p><span class="status available" data-i18n="available">Available</span></p><a class="btn btn-secondary" href="${SITE_BASE}/chinese/" data-i18n="enter_chinese_library">Enter Chinese Library</a></article><article class="card language-card"><h3>Vietnamese Listening With Me</h3><p><span class="status soon" data-i18n="coming_soon">Coming soon</span></p></article><article class="card language-card"><h3>Korean Listening With Me</h3><p><span class="status soon" data-i18n="coming_soon">Coming soon</span></p></article><article class="card language-card"><h3>Japanese Listening With Me</h3><p><span class="status soon" data-i18n="coming_soon">Coming soon</span></p></article></div></section><section id="how-it-works" class="card"><h2 data-i18n="how_title">How it works</h2><div class="layers"><p><strong data-i18n="layer1_title">Languages / Learning language</strong>: <span data-i18n="layer1_desc">Choose the language channel you want to study.</span></p><p><strong data-i18n="layer2_title">Interface Language</strong>: <span data-i18n="layer2_desc">Choose English or Vietnamese for the website UI.</span></p><p><strong data-i18n="layer3_title">Lesson Translation</strong>: <span data-i18n="layer3_desc">Choose English, Vietnamese, or No Translation inside each lesson.</span></p></div></section><section id="latest-lessons" class="latest-lessons card"><h2 data-i18n="latest_lessons">Latest Lessons</h2><div class="lesson-grid">${list}</div></section></div>${baseScript(false)}`;

  const chineseContent = `<div class="wide-shell page-flow"><section class="home-hero card"><div><p class="badge">Chinese Library</p><h1 data-i18n="chinese_library_title">Listening Chinese With Me</h1><p data-i18n="chinese_library_desc">Chinese listening stories with transcript...</p><div class="hero-actions"><a class="btn" href="#latest-lessons" data-i18n="browse_chinese">Browse Chinese lessons</a></div></div><div class="hero-visual" aria-hidden="true"><span class="blob a"></span><span class="blob b"></span><div class="study-card"><p class="badge">中文</p><h3>早上好</h3><p class="pinyin">zǎoshang hǎo</p><p>Practice gentle stories with transcript and study notes.</p><span class="hsk-chip">HSK Library</span></div></div></section><section id="latest-lessons" class="latest-lessons card"><h2>Latest Chinese Lessons</h2><div class="lesson-grid">${list}</div></section></div>${baseScript(false)}`;

  fs.writeFileSync(path.join(distDir, 'index.html'), renderPage('Listening With Me', homeContent, { assetPath: `${SITE_BASE}/`, homePath: SITE_BASE }), 'utf8');
  ensure(path.join(distDir, 'chinese'));
  fs.writeFileSync(path.join(distDir, 'chinese/index.html'), renderPage('Listening Chinese With Me', chineseContent, { assetPath: `${SITE_BASE}/`, homePath: SITE_BASE }), 'utf8');
}

build();
