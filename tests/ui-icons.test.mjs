import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const visualFiles = [
  'src/components/SiteHeader.astro',
  'src/components/SiteFooter.astro',
  'src/pages/[lang]/index.astro',
  'src/pages/[lang]/work/[slug].astro',
  'src/pages/[lang]/resume.astro',
  'src/styles/global.css',
  'src/styles/mobile.css'
];

test('navigation uses vector icons instead of OS-dependent arrow glyphs', () => {
  for (const file of visualFiles) {
    const source = readFileSync(file, 'utf8');
    assert.doesNotMatch(source, /[↗↘↖↙←→]/u, `Legacy arrow glyph in ${file}`);
  }
  const component = readFileSync('src/components/ArrowIcon.astro', 'utf8');
  assert.match(component, /stroke="currentColor"/);
  assert.match(component, /direction\?: 'right' \| 'up-right' \| 'left' \| 'down'/);
  assert.match(readFileSync('src/components/SiteHeader.astro','utf8'), /<ArrowIcon direction="right"/);
});

test('mobile CSS has usable tap targets and readable case-study artwork', () => {
  const css = readFileSync('src/styles/mobile.css', 'utf8');
  assert.match(css, /min-height: 44px/);
  assert.match(css, /project-art--c7x/);
  assert.match(css, /mobile-menu summary:focus-visible/);
});
