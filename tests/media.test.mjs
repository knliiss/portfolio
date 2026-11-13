import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync, statSync } from 'node:fs';

const src = readFileSync('src/data/content.ts', 'utf8');
const html = readFileSync('src/components/ProjectVisual.astro', 'utf8');
const stories = readFileSync('src/data/stories.ts', 'utf8');

test('all public visual assets are committed and nonempty', () => {
  for (const path of [
    'public/media/mnemos/home.webp',
    'public/media/mnemos/wallet.webp', 'public/media/mnemos/events-global.webp',
    'public/media/mnemos/events-drops.webp', 'public/media/mnemos/rankings.webp',
    'public/media/mnemos/profile.webp',
    'public/media/studium/student.png', 'public/media/studium/teacher.png',
    'public/media/studium/admin.png', 'public/media/wavecode/example.svg',
    'public/media/wavecode/mark.svg'
  ]) {
    assert.equal(existsSync(path), true, 'missing: ' + path);
    assert.ok(statSync(path).size > 1000, 'empty: ' + path);
  }
});

test('WaveCode visual contains actual Rust-generated optical frame', () => {
  const svg = readFileSync('public/media/wavecode/example.svg', 'utf8');
  assert.ok((svg.match(/<rect /g) || []).length >= 70);
  assert.match(svg, /wavecode-upper/);
  assert.match(html, /media\/wavecode\/example\.svg/);
});

test('private repository images are never referenced by public-facing site', () => {
  assert.equal(src.includes('raw.githubusercontent.com/knliiss/Mnemos'), false);
  assert.equal(src.includes('raw.githubusercontent.com/knliiss/Studium'), false);
});

test('each case has concrete steps in both languages', () => {
  for (const slug of ['mnemos', 'wavecode', 'c7xbotmanager', 'studium']) {
    assert.ok(stories.includes(slug + ': {'));
  }
  assert.ok(stories.includes('responsibilities'));
  assert.ok(stories.includes("title: 'Collect'"));
  assert.ok(stories.includes("title: 'Scan locally'"));
});
