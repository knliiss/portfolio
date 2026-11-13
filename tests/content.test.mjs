import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const content = fs.readFileSync(path.join(root, 'src/data/content.ts'), 'utf8');
const pages = fs.readFileSync(path.join(root, 'src/pages/[lang]/index.astro'), 'utf8');
const layout = fs.readFileSync(path.join(root, 'src/layouts/BaseLayout.astro'), 'utf8');

test('both languages and four selected case studies are defined', () => {
  for (const key of ["slug: 'mnemos'", "slug: 'wavecode'", "slug: 'c7xbotmanager'", "slug: 'studium'"]) {
    assert.ok(content.includes(key), 'missing: ' + key);
  }
  assert.ok(content.includes("['en', 'uk']"));
});

test('contact and source references use verified personal URLs', () => {
  assert.ok(content.includes('vitallot21@gmail.com'));
  assert.ok(content.includes('linkedin.com/in/vitalii-lototskyi-20aa25374'));
  assert.ok(content.includes('github.com/knliiss/WaveCode-Web'));
});

test('site exposes internationalization and semantic sections', () => {
  assert.ok(layout.includes('hreflang'));
  assert.ok(pages.includes('id="work"'));
  assert.ok(pages.includes('id="contact"'));
});
