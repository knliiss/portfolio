import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = process.env.VISUAL_QA_ORIGIN || 'http://127.0.0.1:4173';
const fixtures = [
  ['home-desktop', '/en/', 1440, 900],
  ['home-mobile', '/en/', 390, 844],
  ['home-mobile-small', '/uk/', 320, 740],
  ['c7x-desktop', '/en/work/c7xbotmanager/', 1440, 900],
  ['c7x-mobile', '/en/work/c7xbotmanager/', 390, 844],
  ['wavecode-desktop', '/en/work/wavecode/', 1440, 900],
  ['mnemos-desktop', '/en/work/mnemos/', 1440, 900],
  ['studium-desktop', '/en/work/studium/', 1440, 900],
  ['studium-mobile', '/uk/work/studium/', 390, 844]
];

await mkdir('visual-qa', { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = [];
try {
  for (const [name, route, width, height] of fixtures) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const page = await context.newPage();
    const exceptions = [];
    page.on('pageerror', error => exceptions.push(error.message));
    const response = await page.goto(origin + route, { waitUntil: 'load', timeout: 20000 });
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode().catch(() => undefined))));
    const result = await page.evaluate(() => ({
      bodyWidth: document.body.scrollWidth,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
      images: [...document.images].map(image => ({ source: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 })),
      heading: document.querySelector('h1')?.textContent?.trim() ?? ''
    }));
    await page.screenshot({ path: 'visual-qa/' + name + '.png', fullPage: true });
    report.push({ name, route, status: response?.status(), ...result, errors: exceptions });
    if (response?.status() !== 200 || result.images.some(image => !image.loaded) || result.documentWidth > width + 1 || exceptions.length > 0) {
      console.error(JSON.stringify(report.at(-1), null, 2));
      throw new Error('Visual smoke check failed: ' + name);
    }
    await context.close();
  }
} finally {
  await browser.close();
  await writeFile('visual-qa/report.json', JSON.stringify(report, null, 2));
}
console.log('Visual QA: ' + report.length + ' viewports passed.');
