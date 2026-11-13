import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const home = readFileSync('src/pages/[lang]/index.astro', 'utf8');
const global = readFileSync('src/styles/global.css', 'utf8');
const mobile = readFileSync('src/styles/mobile.css', 'utf8');

test('mobile header scrolls with the page instead of being sticky', () => {
  assert.match(mobile, /@media screen and \(max-width: 900px\)[\s\S]*?\.site-header \{ position: static/);
});
test('mobile project previews place heading before artwork and details below it', () => {
  assert.match(mobile, /grid-template-areas: "heading" "image" "details"/);
  assert.match(mobile, /\.showcase-summary \{ display: block;/);
  assert.match(mobile, /\.showcase-details \{ display: block;/);
  assert.match(home, /class="showcase-summary"/);
  assert.match(home, /class="showcase-details"/);
});
test('WaveCode card directly opens the live tool while preserving a case-study link', () => {
  assert.match(home, /const mainUrl = liveUrl \?\? link/);
  assert.match(home, /href=\{liveUrl\} target="_blank"/);
  assert.match(home, /class="text-link showcase-secondary-link" href=\{link\}/);
});
test('Mnemos cover is neutral and the screenshot is not filtered or recolored', () => {
  assert.match(global, /\.project-art--mnemos \{\s*background: #ededed;\s*color: #171717;/);
  assert.doesNotMatch(global, /\.mnemos-device img[^}]*filter:/);
});
