import fs from 'fs';
import path from 'path';

const root = process.cwd();
const contentDir = path.join(root, 'content/lessons');
const distDir = path.join(root, 'dist');
const baseTemplate = fs.readFileSync(path.join(root, 'templates/base.html'), 'utf8');

const SITE_BASE = '/listening-chinese-with-me';

const REQUIRED_FRONTMATTER = ['title', 'slug', 'hsk', 'summary'];
const REQUIRED_SECTIONS = ['chinese', 'pinyin', 'vietnamese', 'english', 'vocabulary', 'grammar_notes', 'video_description', 'pinned_comment', 'thumbnail_idea', 'image_timeline'];

const SECTION_LABELS = {
  chinese: 'Chinese',
  pinyin: 'Pinyin',
  vietnamese: 'Vietnamese',
  english: 'English',
  vocabulary: 'Vocabulary',
  grammar_notes: 'Grammar Notes',
  video_description: 'About this lesson'
};

const LEARNING_LANGUAGE_CHANNELS = [
  { id: 'chinese', flag: '🇨🇳', code: 'ZH', enabled: true }
];
const UI_TEXT = {
  en: {
    home: 'Home',
    languages: 'Languages',
    how_it_works: 'How it works',
    latest_lessons: 'Latest Lessons',
    choose_language: 'Choose a language',
    start_chinese: 'Start with Chinese',
    open_lesson: 'Open Lesson',
    about_lesson: 'About this lesson',
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
    subtitle: 'Subtitle',
    shadowing: 'Shadowing',
    pronunciation: 'Pronunciation',
    dictation: 'Dictation',
    summary_tab: 'Summary',
    sidebar_toggle: 'Toggle learning sidebar',
    weekly_streak: 'Weekly streak',
    learning_language: 'Learning language',
    video_library: 'Video Library',
    my_videos: 'My Videos',
    grammar: 'Grammar',
    monday_short: 'Mon',
    tuesday_short: 'Tue',
    wednesday_short: 'Wed',
    thursday_short: 'Thu',
    friday_short: 'Fri',
    saturday_short: 'Sat',
    sunday_short: 'Sun',
    vietnamese_language: 'Vietnamese',
    korean_language: 'Korean',
    japanese_language: 'Japanese',
    english_language: 'English'
  },
  vi: {
    home: 'Trang chủ',
    languages: 'Ngôn ngữ',
    how_it_works: 'Cách hoạt động',
    latest_lessons: 'Bài học mới nhất',
    choose_language: 'Chọn ngôn ngữ',
    start_chinese: 'Bắt đầu với tiếng Trung',
    open_lesson: 'Mở bài học',
    about_lesson: 'Giới thiệu bài học',
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
    summary_tab: 'Tóm tắt',
    sidebar_toggle: 'Mở/đóng thanh học tập',
    weekly_streak: 'Chuỗi học trong tuần',
    learning_language: 'Ngôn ngữ học',
    video_library: 'Kho video',
    my_videos: 'Video của tôi',
    grammar: 'Ngữ pháp',
    monday_short: 'Th2',
    tuesday_short: 'Th3',
    wednesday_short: 'Th4',
    thursday_short: 'Th5',
    friday_short: 'Th6',
    saturday_short: 'Th7',
    sunday_short: 'CN',
    vietnamese_language: 'Tiếng Việt',
    korean_language: 'Tiếng Hàn',
    japanese_language: 'Tiếng Nhật',
    english_language: 'Tiếng Anh'
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

function appendQueryParams(url, params) {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}${params}`;
}

function toYouTubeEmbedUrl(url, { enableJsApi = false } = {}) {
  const id = extractYouTubeId(url);
  if (!id) return null;
  const params = `rel=0&modestbranding=1&playsinline=1${enableJsApi ? '&enablejsapi=1' : ''}`;
  return appendQueryParams(`https://www.youtube.com/embed/${id}`, params);
}

function parseTimelineTime(raw) {
  const parts = raw.trim().split(':');
  if (parts.length < 2 || parts.length > 3) return null;
  const seconds = Number(parts.pop());
  const minutes = Number(parts.pop());
  const hours = parts.length ? Number(parts.pop()) : 0;
  if (![hours, minutes, seconds].every(Number.isFinite)) return null;
  return hours * 3600 + minutes * 60 + seconds;
}

function parseSubtitleTimeline(raw = '') {
  const normalized = raw.replace(/\r/g, '').trim();
  if (!normalized) return [];
  return normalized.split(/\n{2,}/).map((block) => {
    const [timeLine, ...textLines] = block.split('\n');
    const match = (timeLine || '').match(/^\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\.\d+)?)\s*-->\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\.\d+)?)\s*$/);
    if (!match) return null;
    const start = parseTimelineTime(match[1]);
    const end = parseTimelineTime(match[2]);
    const text = textLines.join(' ').trim();
    if (start === null || end === null || end <= start || !text) return null;
    return { start, end, text };
  }).filter(Boolean);
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

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sentenceSplitChinese(raw) {
  return raw
    .replace(/\r/g, '')
    .split(/(?<=[。！？!?])/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function sentenceSplitLocalized(raw) {
  return raw
    .replace(/\r/g, '')
    .split(/(?<=[。！？!?.])/u)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function countHanziSyllables(value = '') {
  const hanzi = value.match(/[\p{Script=Han}]/gu) || [];
  const withoutErSuffix = hanzi.length > 1 && hanzi.at(-1) === '儿' ? hanzi.slice(0, -1) : hanzi;
  return withoutErSuffix.length;
}

function countPinyinSyllables(value = '') {
  const vowelGroups = value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .match(/[aeiouüv]+/g);
  return Math.max(1, vowelGroups ? vowelGroups.length : 0);
}

function cleanPinyinToken(value = '') {
  return value.replace(/^[\s,.;:!?，。！？；：、“”"'()\[\]{}]+|[\s,.;:!?，。！？；：、“”"'()\[\]{}]+$/g, '');
}

function pinyinUnits(value = '') {
  return value
    .replace(/[—–-]/g, ' ')
    .split(/\s+/)
    .map(cleanPinyinToken)
    .filter(Boolean);
}

function hanziSegments(value = '') {
  const fallbackSegments = Array.from(value.matchAll(/[\p{Script=Han}]+|[^\p{Script=Han}]+/gu), ([segment]) => segment.trim()).filter(Boolean);
  if (typeof Intl === 'undefined' || typeof Intl.Segmenter === 'undefined') return fallbackSegments;
  const segmenter = new Intl.Segmenter('zh', { granularity: 'word' });
  return Array.from(segmenter.segment(value), ({ segment }) => segment.trim()).filter(Boolean);
}

function autoTokenizeSubtitleLine(text = '', pinyin = '') {
  const units = pinyinUnits(pinyin);
  if (!text || !units.length) return [];

  let cursor = 0;
  const tokens = [];

  for (const segment of hanziSegments(text)) {
    const expectedSyllables = countHanziSyllables(segment);
    if (!expectedSyllables) {
      const previous = tokens.at(-1);
      if (previous) previous.hanzi = `${previous.hanzi}${segment}`;
      continue;
    }

    const pinyinParts = [];
    let actualSyllables = 0;
    while (cursor < units.length && actualSyllables < expectedSyllables) {
      const unit = units[cursor];
      pinyinParts.push(unit);
      actualSyllables += countPinyinSyllables(unit);
      cursor += 1;
    }

    if (actualSyllables !== expectedSyllables || !pinyinParts.length) return [];
    tokens.push({ hanzi: segment, pinyin: pinyinParts.join(' ') });
  }

  return cursor === units.length ? tokens : [];
}

function normalizeSubtitleTokens(tokens) {
  if (!Array.isArray(tokens)) return [];
  return tokens
    .map((token) => ({
      hanzi: String(token?.hanzi || '').trim(),
      pinyin: String(token?.pinyin || '').trim()
    }))
    .filter((token) => token.hanzi);
}

function parseTokenizedSubtitleRows(sections) {
  const raw = sections.subtitle_tokens || sections.tokenized_subtitles || '';
  if (!raw.trim()) return [];
  try {
    const rows = JSON.parse(raw);
    if (!Array.isArray(rows)) return [];
    return rows.map((row) => normalizeSubtitleTokens(row?.tokens || row));
  } catch (e) {
    return [];
  }
}

function makeSubtitleRows(sections) {
  const chinese = sentenceSplitChinese(sections.chinese || '');
  const pinyin = sentenceSplitLocalized(sections.pinyin || '');
  const vietnamese = sentenceSplitLocalized(sections.vietnamese || '');
  const english = sentenceSplitLocalized(sections.english || '');
  const tokenizedRows = parseTokenizedSubtitleRows(sections);

  return chinese.map((text, index) => {
    const rowPinyin = pinyin[index] || '';
    const explicitTokens = normalizeSubtitleTokens(tokenizedRows[index]);

    return {
      text,
      pinyin: rowPinyin,
      vietnamese: vietnamese[index] || '',
      english: english[index] || '',
      tokens: explicitTokens.length ? explicitTokens : autoTokenizeSubtitleLine(text, rowPinyin)
    };
  });
}

function renderSubtitleTokens(tokens = []) {
  return tokens
    .map((token) => `<span class="lesson-subtitle-token"><span class="lesson-subtitle-token-pinyin">${escapeHtml(token.pinyin)}</span><span class="lesson-subtitle-token-hanzi">${escapeHtml(token.hanzi)}</span></span>`)
    .join('');
}

function renderSubtitleCard(rows) {
  const first = rows[0] || { text: '', pinyin: '', vietnamese: '', english: '', tokens: [] };
  const hasTokens = first.tokens?.length > 0;
  return `<div class="lesson-subtitle-wrap" data-subtitle-wrap="true" aria-live="polite"><div class="lesson-display-toggles" aria-label="Subtitle display controls"><button type="button" class="lesson-display-toggle is-active" data-display-toggle="subtitle" aria-pressed="true" data-i18n="subtitle">Subtitle</button><button type="button" class="lesson-display-toggle is-active" data-display-toggle="translation" aria-pressed="true" data-i18n="translation">Translation</button></div><div class="lesson-subtitle-card" data-subtitle-card="true"><div class="lesson-subtitle-tokens${hasTokens ? '' : ' is-hidden'}" data-subtitle-tokens-list>${renderSubtitleTokens(first.tokens)}</div><div class="lesson-subtitle-fallback${hasTokens ? ' is-hidden' : ''}" data-subtitle-fallback><p class="lesson-subtitle-pinyin" data-subtitle-pinyin>${escapeHtml(first.pinyin)}</p><p class="lesson-subtitle-chinese" data-subtitle-chinese>${escapeHtml(first.text)}</p></div><p class="lesson-subtitle-translation" data-subtitle-translation data-subtitle-english="${escapeHtml(first.english)}" data-subtitle-vietnamese="${escapeHtml(first.vietnamese)}">${escapeHtml(first.english || first.vietnamese)}</p></div></div>`;
}

function renderTranscriptLines(rows) {
  if (!rows.length) return '<p class="missing">(Content missing)</p>';
  return rows
    .map((line, index) => `<li class="transcript-line${index === 0 ? ' active' : ''}" data-subtitle-line="true" data-subtitle-text="${escapeHtml(line.text)}" data-subtitle-pinyin="${escapeHtml(line.pinyin)}" data-subtitle-vietnamese="${escapeHtml(line.vietnamese)}" data-subtitle-english="${escapeHtml(line.english)}" data-subtitle-tokens="${escapeHtml(JSON.stringify(line.tokens || []))}" tabindex="0"><span class="transcript-cue" aria-hidden="true">▶</span><span class="transcript-line-body"><span class="transcript-line-text">${escapeHtml(line.text)}</span><span class="transcript-line-translation" data-transcript-translation data-transcript-english="${escapeHtml(line.english)}" data-transcript-vietnamese="${escapeHtml(line.vietnamese)}">${escapeHtml(line.english || line.vietnamese)}</span></span><span class="sr-only">Line ${index + 1}</span></li>`)
    .join('');
}

function renderTimelineTranscriptLines(timeline) {
  if (!timeline.length) return '';
  return timeline
    .map((line, index) => `<li class="transcript-line" data-subtitle-line="true" data-subtitle-text="${escapeHtml(line.text)}" data-subtitle-pinyin="${escapeHtml(line.pinyin || '')}" data-subtitle-vietnamese="${escapeHtml(line.vietnamese || '')}" data-subtitle-english="${escapeHtml(line.english || '')}" data-start="${line.start}" data-end="${line.end}" tabindex="0"><span class="transcript-cue" aria-hidden="true">▶</span><span class="transcript-line-body"><span class="transcript-line-text">${escapeHtml(line.text)}</span><span class="transcript-line-translation" data-transcript-translation data-transcript-english="${escapeHtml(line.english || '')}" data-transcript-vietnamese="${escapeHtml(line.vietnamese || '')}">${escapeHtml(line.english || line.vietnamese || '')}</span></span><span class="sr-only">Line ${index + 1}</span></li>`)
    .join('');
}

function renderStudyPlayer({ meta, sections, youtubeEmbed, hasSubtitleTimeline }) {
  const iframeId = hasSubtitleTimeline ? ' id="lesson-youtube-player" data-youtube-player="true"' : '';
  const videoBlock = youtubeEmbed
    ? `<div class="lesson-video-frame"><iframe${iframeId} src="${youtubeEmbed}" title="${meta.title} - YouTube video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`
    : '<div class="lesson-video-frame lesson-video-placeholder"><p>Video coming soon</p></div>';
  const summaryBody = renderLocalizedSectionBody(sections.video_description || '');
  const timeline = hasSubtitleTimeline ? parseSubtitleTimeline(sections.subtitle_timeline) : [];
  const generatedSubtitleRows = makeSubtitleRows(sections);
  const subtitleRows = timeline.length ? timeline.map((line, index) => ({ text: line.text, pinyin: generatedSubtitleRows[index]?.pinyin || '', vietnamese: generatedSubtitleRows[index]?.vietnamese || '', english: generatedSubtitleRows[index]?.english || '', start: line.start, end: line.end })) : generatedSubtitleRows;
  const transcriptListAttrs = timeline.length ? ' class="transcript-lines" data-transcript-timeline="true"' : ' class="transcript-lines"';
  const transcriptLines = timeline.length ? renderTimelineTranscriptLines(subtitleRows) : renderTranscriptLines(subtitleRows);
  const subtitleCard = renderSubtitleCard(subtitleRows);
  return `<section class="study-player-layout lesson-page-block card" aria-label="Video study player"><div class="study-mode-tabs" role="tablist" aria-label="Study modes"><button type="button" id="study-tab-shadowing" class="study-mode-tab is-active" role="tab" aria-selected="true" aria-controls="study-panel-shadowing" data-study-tab="shadowing" data-i18n="shadowing">Shadowing</button><button type="button" id="study-tab-pronunciation" class="study-mode-tab" role="tab" aria-selected="false" aria-controls="study-panel-pronunciation" data-study-tab="pronunciation" data-i18n="pronunciation">Pronunciation</button><button type="button" id="study-tab-dictation" class="study-mode-tab" role="tab" aria-selected="false" aria-controls="study-panel-dictation" data-study-tab="dictation" data-i18n="dictation">Dictation</button><button type="button" id="study-tab-summary" class="study-mode-tab" role="tab" aria-selected="false" aria-controls="study-panel-summary" data-study-tab="summary" data-i18n="summary_tab">Summary</button></div><div id="study-panel-shadowing" class="study-tab-panel" role="tabpanel" aria-labelledby="study-tab-shadowing" data-study-panel="shadowing"><div class="study-player-grid"><div class="study-video-column"><section class="lesson-video" aria-label="Lesson video">${videoBlock}${subtitleCard}</section></div><aside class="transcript-panel" aria-label="Transcript"><div class="transcript-panel-header"><h2 data-i18n="transcript">Transcript</h2><span>${meta.hsk}</span></div><ol${transcriptListAttrs}>${transcriptLines}</ol></aside></div></div><div id="study-panel-pronunciation" class="study-tab-panel study-placeholder-panel" role="tabpanel" aria-labelledby="study-tab-pronunciation" data-study-panel="pronunciation" hidden><p data-i18n="coming_soon">Coming soon</p></div><div id="study-panel-dictation" class="study-tab-panel study-placeholder-panel" role="tabpanel" aria-labelledby="study-tab-dictation" data-study-panel="dictation" hidden><p data-i18n="coming_soon">Coming soon</p></div><div id="study-panel-summary" class="study-tab-panel study-summary-panel" role="tabpanel" aria-labelledby="study-tab-summary" data-study-panel="summary" hidden><section id="lesson-summary-tab" aria-label="${SECTION_LABELS.video_description}"><h2 data-i18n="about_lesson">${SECTION_LABELS.video_description}</h2>${summaryBody}</section></div></section>`;
}

function renderLessonChrome({ lessonSeoHeader, studyPlayer, lessonCounts }) {
  return `<div class="lesson-with-sidebar sidebar-collapsed" data-lesson-with-sidebar>${renderLearningSidebar({ lessonCounts })}<div class="lesson-main-pane"><div class="lesson-shell lesson-content-flow lesson-top-flow">${lessonSeoHeader}${studyPlayer}</div></div></div>`;
}

function renderLearningSidebar({ lessonCounts = {}, activeLanguage = 'chinese' } = {}) {
  const days = [
    ['monday_short', 'Mon'],
    ['tuesday_short', 'Tue'],
    ['wednesday_short', 'Wed'],
    ['thursday_short', 'Thu'],
    ['friday_short', 'Fri'],
    ['saturday_short', 'Sat'],
    ['sunday_short', 'Sun']
  ];
  const streakDays = days
    .map(([key, fallback], index) => `<span class="streak-day" data-streak-day="${index}" data-i18n="${key}">${fallback}</span>`)
    .join('');
  const availableLearningLanguages = LEARNING_LANGUAGE_CHANNELS.filter((language) => language.enabled && (lessonCounts[language.id] || 0) > 0);
  const languageItems = availableLearningLanguages
    .map((language) => {
      const classes = ['learning-language'];
      const flag = language.flag || '🇨🇳';
      if (language.id === activeLanguage) classes.push('active');
      return `<span class="${classes.join(' ')}" data-sidebar-expand-on-activate aria-label="${language.id}"><span class="learning-language-flag" aria-hidden="true">${flag}</span><span class="learning-language-code">${language.code}</span></span>`;
    })
    .join('');
  const navItems = [
    { href: `${SITE_BASE}/`, icon: '⌂', key: 'home', fallback: 'Home' },
    { href: `${SITE_BASE}/chinese/#latest-lessons`, icon: '▶', key: 'video_library', fallback: 'Video Library' },
    { icon: '▣', key: 'my_videos', fallback: 'My Videos', disabled: true },
    { icon: 'Aa', key: 'vocabulary', fallback: 'Vocabulary', disabled: true },
    { icon: '文', key: 'grammar', fallback: 'Grammar', disabled: true }
  ];
  const navMarkup = navItems
    .map((item) => {
      const content = `<span class="sidebar-icon" aria-hidden="true">${item.icon}</span><span class="lesson-sidebar-text" data-i18n="${item.key}">${item.fallback}</span>${item.disabled ? '<span class="soon-badge lesson-sidebar-text" data-i18n="coming_soon">Soon</span>' : ''}`;
      const attrs = `class="sidebar-nav-item${item.disabled ? ' disabled' : ''}" title="${item.fallback}" data-i18n-title="${item.key}"`;
      if (item.disabled) return `<span ${attrs} aria-disabled="true">${content}</span>`;
      return `<a ${attrs} href="${item.href}">${content}</a>`;
    })
    .join('');
  return `<button type="button" class="lesson-sidebar-mobile-toggle" data-sidebar-open aria-controls="lesson-learning-sidebar" aria-expanded="false" aria-label="Open learning sidebar">☰</button><div class="lesson-sidebar-backdrop" data-sidebar-backdrop hidden></div><aside id="lesson-learning-sidebar" class="lesson-sidebar is-collapsed" data-lesson-sidebar aria-label="Learning tools"><div class="lesson-sidebar-header"><a class="lesson-sidebar-brand" href="${SITE_BASE}/" aria-label="Listening With Me Home"><span class="lesson-sidebar-logo">听</span><span class="lesson-sidebar-text"><strong>Listening With Me</strong></span></a><button type="button" class="lesson-sidebar-toggle" data-sidebar-toggle aria-label="Toggle learning sidebar" data-i18n-aria-label="sidebar_toggle"><span aria-hidden="true">☰</span></button></div><section class="sidebar-section sidebar-streak" aria-label="Weekly streak"><p class="sidebar-section-title" data-i18n="weekly_streak">Weekly streak</p><div class="streak-days" data-streak-days>${streakDays}</div></section><section class="sidebar-section sidebar-language" aria-label="Learning language"><p class="sidebar-section-title" data-i18n="learning_language">Learning language</p><div class="learning-language-list">${languageItems}</div></section><nav class="sidebar-nav" aria-label="Lesson shortcuts">${navMarkup}</nav></aside>`;
}

function validateLesson(meta, body, fileName) { for (const key of REQUIRED_FRONTMATTER) if (!meta[key]) throw new Error(`${fileName}: thiếu frontmatter "${key}".`); const sections = parseSections(body); for (const key of REQUIRED_SECTIONS) if (!sections[key]) throw new Error(`${fileName}: thiếu section "## ${key}".`); }
function renderPage(title, content, { assetPath = './', homePath = './' } = {}) { return baseTemplate.replace(/\{\{(\w+)\}\}/g, (m, key) => ({ title, assetPath, homePath, content }[key] ?? m)); }
function copyAssets() { ensure(path.join(distDir, 'assets/css')); fs.copyFileSync(path.join(root, 'src/assets/css/style.css'), path.join(distDir, 'assets/css/style.css')); }

function baseScript(isLesson) {
  return `<script>(function(){const ui=${JSON.stringify(UI_TEXT)};const isLesson=${isLesson};const langSelect=document.getElementById('interface-language');let currentLang=ui[localStorage.getItem('interfaceLanguage')]?localStorage.getItem('interfaceLanguage'):'en';const subtitlePreferenceKey='lessonShowSubtitle';const translationPreferenceKey='lessonShowTranslation';const radios=document.querySelectorAll('input[name="translation"]');const sections=document.querySelectorAll('.translation-section');const hasLessonTranslationControls=radios.length>0;function getTranslationLanguage(mode){if(mode==='vietnamese')return'vietnamese';if(mode==='english')return'english';return currentLang==='vi'?'vietnamese':'english';}function applyLang(lang){const selected=ui[lang]?lang:'en';currentLang=selected;document.documentElement.lang=selected;document.querySelectorAll('[data-i18n]').forEach((el)=>{const key=el.dataset.i18n;if(ui[selected][key])el.textContent=ui[selected][key];});document.querySelectorAll('[data-i18n-aria-label]').forEach((el)=>{const key=el.dataset.i18nAriaLabel;if(ui[selected][key])el.setAttribute('aria-label',ui[selected][key]);});document.querySelectorAll('[data-i18n-title]').forEach((el)=>{const key=el.dataset.i18nTitle;if(ui[selected][key])el.setAttribute('title',ui[selected][key]);});document.querySelectorAll('[data-localized-content]').forEach((el)=>{el.hidden=el.dataset.localizedContent!==selected;});const noneLabel=document.querySelector('[data-i18n-radio-none]');if(noneLabel)noneLabel.parentElement.lastChild.textContent=' '+ui[selected].no_translation;if(langSelect)langSelect.value=selected;updateStudyTranslations();}function initLearningSidebar(){const shell=document.querySelector('[data-lesson-with-sidebar]');const sidebar=document.querySelector('[data-lesson-sidebar]');if(!shell||!sidebar)return;const toggles=document.querySelectorAll('[data-sidebar-toggle],[data-sidebar-open]');const openButtons=document.querySelectorAll('[data-sidebar-open]');const backdrop=document.querySelector('[data-sidebar-backdrop]');const storageKey='lessonSidebarExpanded';const mobileQuery=window.matchMedia('(max-width: 820px)');function setExpanded(expanded){shell.classList.toggle('sidebar-expanded',expanded);shell.classList.toggle('sidebar-collapsed',!expanded);sidebar.classList.toggle('is-expanded',expanded);sidebar.classList.toggle('is-collapsed',!expanded);document.body.classList.toggle('lesson-sidebar-drawer-open',expanded&&mobileQuery.matches);if(backdrop)backdrop.hidden=!(expanded&&mobileQuery.matches);toggles.forEach((button)=>button.setAttribute('aria-expanded',String(expanded)));localStorage.setItem(storageKey,expanded?'true':'false');}function initialExpanded(){return mobileQuery.matches?false:localStorage.getItem(storageKey)==='true';}toggles.forEach((button)=>button.addEventListener('click',()=>setExpanded(!shell.classList.contains('sidebar-expanded'))));document.querySelectorAll('[data-sidebar-expand-on-activate]').forEach((item)=>item.addEventListener('click',()=>{if(!shell.classList.contains('sidebar-expanded'))setExpanded(true);}));if(backdrop)backdrop.addEventListener('click',()=>setExpanded(false));document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&shell.classList.contains('sidebar-expanded'))setExpanded(false);});mobileQuery.addEventListener('change',()=>setExpanded(initialExpanded()));setExpanded(initialExpanded());const today=(new Date().getDay()+6)%7;document.querySelectorAll('[data-streak-day]').forEach((day)=>{const isToday=Number(day.dataset.streakDay)===today;day.classList.toggle('active',isToday);day.classList.toggle('is-today',isToday);});}function initStudyTabs(){const tabs=document.querySelectorAll('[data-study-tab]');const panels=document.querySelectorAll('[data-study-panel]');if(!tabs.length||!panels.length)return;function activate(mode){tabs.forEach((tab)=>{const active=tab.dataset.studyTab===mode;tab.classList.toggle('is-active',active);tab.setAttribute('aria-selected',String(active));});panels.forEach((panel)=>{panel.hidden=panel.dataset.studyPanel!==mode;});}tabs.forEach((tab)=>tab.addEventListener('click',()=>activate(tab.dataset.studyTab)));activate('shadowing');}function currentLessonTranslationMode(){if(!hasLessonTranslationControls)return'auto';return document.querySelector('input[name="translation"]:checked')?.value||localStorage.getItem('lessonTranslation')||'auto';}function translationTextFor(el,language){const vietnamese=el.dataset.subtitleVietnamese||el.dataset.transcriptVietnamese||'';const english=el.dataset.subtitleEnglish||el.dataset.transcriptEnglish||'';return language==='vietnamese'?(vietnamese||english):(english||vietnamese);}function updateStudyTranslations(){if(!isLesson)return;const mode=currentLessonTranslationMode();const language=getTranslationLanguage(mode);document.querySelectorAll('[data-subtitle-translation]').forEach((el)=>{el.textContent=mode==='none'?'':translationTextFor(el,language);});document.querySelectorAll('[data-transcript-translation]').forEach((el)=>{el.textContent=mode==='none'?'':translationTextFor(el,language);});applyDisplayToggles();}function applyDisplayToggles(){if(!isLesson)return;const showSubtitle=localStorage.getItem(subtitlePreferenceKey)!=='false';const showTranslation=localStorage.getItem(translationPreferenceKey)!=='false';const mode=currentLessonTranslationMode();const effectiveShowTranslation=showTranslation&&mode!=='none';document.querySelectorAll('[data-display-toggle="subtitle"]').forEach((button)=>{button.classList.toggle('is-active',showSubtitle);button.setAttribute('aria-pressed',String(showSubtitle));});document.querySelectorAll('[data-display-toggle="translation"]').forEach((button)=>{button.classList.toggle('is-active',showTranslation);button.setAttribute('aria-pressed',String(showTranslation));});document.querySelectorAll('[data-subtitle-card]').forEach((card)=>{card.hidden=!showSubtitle&&!effectiveShowTranslation;card.classList.toggle('subtitle-hidden',!showSubtitle);card.classList.toggle('translation-hidden',!effectiveShowTranslation);});document.querySelectorAll('[data-subtitle-tokens-list],[data-subtitle-fallback]').forEach((el)=>{el.hidden=!showSubtitle;});document.querySelectorAll('[data-subtitle-translation]').forEach((el)=>{el.hidden=!effectiveShowTranslation||!el.textContent.trim();});document.querySelectorAll('[data-transcript-translation]').forEach((el)=>{el.hidden=!effectiveShowTranslation||!el.textContent.trim();});}function initDisplayToggles(){document.querySelectorAll('[data-display-toggle]').forEach((button)=>{button.addEventListener('click',()=>{const key=button.dataset.displayToggle==='subtitle'?subtitlePreferenceKey:translationPreferenceKey;const next=localStorage.getItem(key)==='false';localStorage.setItem(key,String(next));updateStudyTranslations();});});applyDisplayToggles();}function initSubtitleTimeline(){const list=document.querySelector('.transcript-lines');const iframe=document.querySelector('[data-youtube-player="true"]');const tokensEl=document.querySelector('[data-subtitle-tokens-list]');const fallbackEl=document.querySelector('[data-subtitle-fallback]');const pinyinEl=document.querySelector('[data-subtitle-pinyin]');const chineseEl=document.querySelector('[data-subtitle-chinese]');const translationEl=document.querySelector('[data-subtitle-translation]');if(!list||!tokensEl||!fallbackEl||!pinyinEl||!chineseEl)return;const lines=Array.from(list.querySelectorAll('[data-subtitle-line="true"]'));if(!lines.length)return;let player=null;let ready=false;let pendingSeek=null;let activeLine=null;function parseTokens(line){try{const tokens=JSON.parse(line.dataset.subtitleTokens||'[]');return Array.isArray(tokens)?tokens.filter((token)=>token&&token.hanzi):[];}catch(e){return [];}}function renderTokens(tokens){tokensEl.replaceChildren(...tokens.map((token)=>{const wrapper=document.createElement('span');wrapper.className='lesson-subtitle-token';const pinyin=document.createElement('span');pinyin.className='lesson-subtitle-token-pinyin';pinyin.textContent=token.pinyin||'';const hanzi=document.createElement('span');hanzi.className='lesson-subtitle-token-hanzi';hanzi.textContent=token.hanzi||'';wrapper.append(pinyin,hanzi);return wrapper;}));}function updateSubtitle(line){if(!line)return;const tokens=parseTokens(line);if(tokens.length){renderTokens(tokens);tokensEl.classList.remove('is-hidden');fallbackEl.classList.add('is-hidden');}else{tokensEl.replaceChildren();tokensEl.classList.add('is-hidden');fallbackEl.classList.remove('is-hidden');pinyinEl.textContent=line.dataset.subtitlePinyin||'';chineseEl.textContent=line.dataset.subtitleText||line.querySelector('.transcript-line-text')?.textContent||'';}if(translationEl){translationEl.dataset.subtitleVietnamese=line.dataset.subtitleVietnamese||'';translationEl.dataset.subtitleEnglish=line.dataset.subtitleEnglish||'';}updateStudyTranslations();}function setActive(line,scroll){if(activeLine===line){if(activeLine&&scroll)activeLine.scrollIntoView({block:'nearest',behavior:'smooth'});return;}if(activeLine)activeLine.classList.remove('active');activeLine=line;if(activeLine){activeLine.classList.add('active');updateSubtitle(activeLine);if(scroll)activeLine.scrollIntoView({block:'nearest',behavior:'smooth'});}}function syncAt(time,scroll){const next=lines.find((line)=>line.dataset.start&&line.dataset.end&&time>=Number(line.dataset.start)&&time<Number(line.dataset.end));setActive(next||null,scroll);}function chooseLine(line){const start=Number(line.dataset.start);setActive(line,true);if(player&&ready&&Number.isFinite(start)){player.seekTo(start,true);player.playVideo();}else if(Number.isFinite(start)){pendingSeek=start;}}lines.forEach((line)=>{line.addEventListener('click',()=>chooseLine(line));line.addEventListener('keydown',(event)=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();chooseLine(line);}});});setActive(lines.find((line)=>line.classList.contains('active'))||lines[0],false);if(!list.matches('[data-transcript-timeline="true"]')||!iframe)return;function startPolling(){window.setInterval(()=>{if(player&&ready&&typeof player.getCurrentTime==='function')syncAt(player.getCurrentTime(),true);},350);}function onReady(){ready=true;if(pendingSeek!==null){player.seekTo(pendingSeek,true);player.playVideo();pendingSeek=null;}startPolling();}window.onYouTubeIframeAPIReady=function(){player=new YT.Player(iframe,{events:{onReady}});};const tag=document.createElement('script');tag.src='https://www.youtube.com/iframe_api';document.head.appendChild(tag);}if(langSelect){langSelect.addEventListener('change',(e)=>{localStorage.setItem('interfaceLanguage',e.target.value);applyLang(e.target.value);});}function renderTranslation(mode){sections.forEach((section)=>{section.hidden=section.dataset.translation!==mode||mode==='none';});radios.forEach((r)=>{r.checked=r.value===mode;});if(isLesson&&hasLessonTranslationControls)localStorage.setItem('lessonTranslation',mode);updateStudyTranslations();}function setDefaultTranslation(lang){renderTranslation(lang==='vi'?'vietnamese':'english');}if(isLesson){initLearningSidebar();initStudyTabs();initSubtitleTimeline();initDisplayToggles();if(hasLessonTranslationControls){const saved=localStorage.getItem('lessonTranslation');if(saved){renderTranslation(saved);}else{setDefaultTranslation(currentLang);}radios.forEach((radio)=>radio.addEventListener('change',()=>renderTranslation(radio.value)));}else{updateStudyTranslations();}}applyLang(currentLang);})();</script>`;
}
function build() {
  clean(distDir); ensure(distDir); copyAssets();
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.md'));
  const lessonCounts = { chinese: files.length };
  const lessons = [];
  for (const file of files) {
    const { meta, body } = parseFrontmatter(fs.readFileSync(path.join(contentDir, file), 'utf8')); validateLesson(meta, body, file);
    const sections = parseSections(body); const pageDir = path.join(distDir, 'lessons', meta.slug); ensure(pageDir);
    const hasSubtitleTimeline = parseSubtitleTimeline(sections.subtitle_timeline || '').length > 0;
    const youtubeEmbed = toYouTubeEmbedUrl(meta.youtube, { enableJsApi: hasSubtitleTimeline });
    const studyPlayer = renderStudyPlayer({ meta, sections, youtubeEmbed, hasSubtitleTimeline });
    const lessonSeoHeader = `<div class="lesson-seo-heading"><h1>${meta.title}</h1><p>${meta.hsk}</p></div>`;
    const lessonChrome = renderLessonChrome({ lessonSeoHeader, studyPlayer, lessonCounts });
    fs.writeFileSync(path.join(pageDir, 'index.html'), renderPage(meta.title, lessonChrome + baseScript(true), { assetPath: `${SITE_BASE}/`, homePath: SITE_BASE }), 'utf8');
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
