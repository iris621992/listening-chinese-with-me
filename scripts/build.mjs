import fs from 'fs';
import path from 'path';

const root = process.cwd();
const contentDir = path.join(root, 'content/lessons');
const distDir = path.join(root, 'dist');
const baseTemplate = fs.readFileSync(path.join(root, 'templates/base.html'), 'utf8');

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

function toHtmlSections(md) {
  return md
    .split('\n## ')
    .map((chunk, idx) => {
      if (idx === 0) return '';
      const [heading, ...rest] = chunk.split('\n');
      const lines = rest.join('\n').trim().split('\n');
      let html = `<section class="card"><h2>${heading}</h2>`;
      let inList = false;
      for (const line of lines) {
        if (line.startsWith('- ')) {
          if (!inList) { html += '<ul>'; inList = true; }
          html += `<li>${line.slice(2)}</li>`;
        } else if (line.trim() === '') {
          if (inList) { html += '</ul>'; inList = false; }
        } else {
          if (inList) { html += '</ul>'; inList = false; }
          html += `<p>${line}</p>`;
        }
      }
      if (inList) html += '</ul>';
      html += '</section>';
      return html;
    })
    .join('');
}

function renderPage(title, content) {
  return baseTemplate.replace('{{title}}', title).replace('{{content}}', content);
}

function copyAssets() {
  ensure(path.join(distDir, 'assets/css'));
  fs.copyFileSync(path.join(root, 'src/assets/css/style.css'), path.join(distDir, 'assets/css/style.css'));
}

function build() {
  clean(distDir);
  ensure(distDir);
  copyAssets();

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
  const lessons = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(contentDir, file), 'utf8');
    const { meta, body } = parseFrontmatter(raw);
    const slug = meta.slug;
    const pageDir = path.join(distDir, 'lessons', slug);
    ensure(pageDir);

    const top = `<article class="card"><h1>${meta.title}</h1><p class="meta">${meta.hsk}</p><p>${meta.summary || ''}</p><p><a class="btn" href="${meta.youtube}" target="_blank" rel="noreferrer">Xem trên YouTube</a></p></article>`;
    const html = renderPage(meta.title, top + toHtmlSections(body));
    fs.writeFileSync(path.join(pageDir, 'index.html'), html, 'utf8');

    lessons.push({ ...meta, url: `/lessons/${slug}/` });
  }

  const list = lessons
    .map(x => `<article class="card"><h2><a href="${x.url}">${x.title}</a></h2><p class="meta">${x.hsk}</p><p>${x.summary || ''}</p></article>`)
    .join('');

  const home = renderPage('Listening Chinese With Me', `<section class="card"><h2>Danh sách bài nghe</h2><p>Chọn bài để luyện nghe.</p></section>${list}`);
  fs.writeFileSync(path.join(distDir, 'index.html'), home, 'utf8');
}

build();

if (process.argv.includes('--watch')) {
  console.log('Watching...');
  fs.watch(path.join(root, 'content'), { recursive: true }, () => {
    try { build(); console.log('Rebuilt'); } catch (e) { console.error(e.message); }
  });
}
