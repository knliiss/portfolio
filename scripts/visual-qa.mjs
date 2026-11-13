import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const origin = process.env.VISUAL_QA_ORIGIN || 'http://127.0.0.1:4173';
const fixtures = [
  ['home-desktop', '/en/', 1440, 900],
  ['home-tablet', '/uk/', 768, 1024],
  ['home-mobile-430', '/en/', 430, 932],
  ['home-mobile-390', '/uk/', 390, 844],
  ['home-mobile-360', '/en/', 360, 780],
  ['home-mobile-320', '/uk/', 320, 740],
  ['mnemos-mobile-390', '/en/work/mnemos/', 390, 844],
  ['mnemos-mobile-320', '/uk/work/mnemos/', 320, 740],
  ['wavecode-mobile-360', '/en/work/wavecode/', 360, 780],
  ['wavecode-mobile-320', '/uk/work/wavecode/', 320, 740],
  ['c7x-mobile-390', '/en/work/c7xbotmanager/', 390, 844],
  ['c7x-mobile-320', '/uk/work/c7xbotmanager/', 320, 740],
  ['studium-mobile-390', '/uk/work/studium/', 390, 844],
  ['studium-mobile-320', '/en/work/studium/', 320, 740],
  ['resume-mobile-360', '/en/resume/', 360, 780],
  ['home-desktop-small', '/en/', 1024, 768],
  ['c7x-desktop', '/en/work/c7xbotmanager/', 1440, 900]
];

await mkdir('visual-qa', { recursive: true });
const browser = await chromium.launch({ headless: true });
const report = [];

try {
  for (const [name, route, width, height] of fixtures) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
      isMobile: width <= 900,
      hasTouch: width <= 900
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(origin + route, { waitUntil: 'load', timeout: 20000 });
    await page.locator('img').evaluateAll(images => images.forEach(img => { img.loading = 'eager'; }));
    await Promise.race([
      page.locator('img').evaluateAll(images => Promise.all(images.map(img => img.decode().catch(() => undefined)))),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Image timeout: ' + name)), 12000))
    ]);
    const stats = await page.evaluate(() => ({
      pageWidth: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
      images: [...document.images].map(img => ({ src: img.currentSrc, loaded: img.complete && img.naturalWidth > 0 })),
      heading: document.querySelector('main h1')?.textContent?.trim(),
      overflowHeadings: [...document.querySelectorAll('main h1,main h2,main h3')].filter(el => el.scrollWidth > el.clientWidth + 2).map(el => el.textContent?.trim().slice(0,80))
    }));
    if (response?.status() !== 200 || stats.images.some(x => !x.loaded) || stats.pageWidth > stats.viewport + 1 || errors.length || stats.overflowHeadings.length) {
      throw Error(JSON.stringify({ name, status: response?.status(), stats, errors }, null, 2));
    }
    if (width <= 900) {
      const headerPosition = await page.locator('.site-header').evaluate(el => getComputedStyle(el).position);
      if (headerPosition !== 'static') throw Error('Header still sticks on phones: ' + name + ' (' + headerPosition + ')');

      if (route === '/en/' || route === '/uk/') {
        const placements = await page.locator('.showcase-item').evaluateAll(cards =>
          cards.map(card => {
            const summary = card.querySelector('.showcase-summary')?.getBoundingClientRect();
            const art = card.querySelector('.showcase-art')?.getBoundingClientRect();
            const details = card.querySelector('.showcase-details')?.getBoundingClientRect();
            return { titleBottom: summary?.bottom, imageTop: art?.top, imageBottom: art?.bottom, detailsTop: details?.top };
          })
        );
        if (placements.length !== 4 || placements.some(pos =>
          pos.titleBottom === undefined || pos.imageTop === undefined ||
          pos.imageBottom === undefined || pos.detailsTop === undefined ||
          pos.titleBottom > pos.imageTop + 1 || pos.imageBottom > pos.detailsTop + 1
        )) throw Error('Mobile project card order is incorrect: ' + name + ' ' + JSON.stringify(placements));

        const liveHref = await page.locator('.showcase-item').nth(1).locator('.showcase-art').getAttribute('href');
        if (liveHref !== 'https://wavecode.knalis.rest/') throw Error('WaveCode card does not directly open the application');

        const mnemosBackground = await page.locator('.project-art--mnemos').first().evaluate(el => getComputedStyle(el).backgroundColor);
        if (mnemosBackground !== 'rgb(237, 237, 237)') throw Error('Mnemos cover is not neutral: ' + mnemosBackground);

        await page.evaluate(() => {
          document.documentElement.style.scrollBehavior = 'auto';
          window.scrollTo(0, 650);
        });
        const headerLocation = await page.locator('.site-header').evaluate(el => el.getBoundingClientRect().bottom);
        if (headerLocation > -5) throw Error('Mobile header remains on screen during page scroll: ' + name);
        await page.evaluate(() => {
          window.scrollTo(0, 0);
          document.documentElement.style.scrollBehavior = '';
        });
      }
      const desktopNavigation = page.locator('.site-nav');
      if (await desktopNavigation.isVisible()) throw Error('Desktop navigation visible on mobile: ' + name);
      const summary = page.locator('#mobile-menu summary');
      if (!(await summary.isVisible())) throw Error('Mobile menu missing: ' + name);
      const size = await summary.boundingBox();
      if (!size || size.width < 42 || size.height < 44) throw Error('Menu touch target too small: ' + name);
      await summary.click();
      if (!(await page.locator('#mobile-menu').evaluate(el => el.open))) throw Error('Menu did not open: ' + name);
      const links = page.locator('.mobile-menu-panel a');
      if (await links.count() !== 4) throw Error('Incomplete mobile navigation: ' + name);
      const bounds = await page.locator('.mobile-menu-panel').boundingBox();
      if (!bounds || bounds.x < -1 || bounds.x + bounds.width > width + 1) throw Error('Menu outside viewport: ' + name);
      await page.keyboard.press('Escape');
      if (await page.locator('#mobile-menu').evaluate(el => el.open)) throw Error('Escape did not dismiss menu: ' + name);
    }
    await page.screenshot({ path: 'visual-qa/' + name + '.png', fullPage: true });
    report.push({ name, status: response?.status(), ...stats, exceptions: errors });
    await context.close();
    console.log('[mobile-qa] ' + name + ' PASS');
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  await page.goto(origin + '/en/', { waitUntil: 'load' });
  await page.locator('#mobile-menu summary').click();
  await page.locator('.mobile-menu-panel a[href$="#work"]').click();
  if (await page.locator('#mobile-menu').evaluate(el => el.open)) throw Error('Menu stayed open after navigation');
  await page.locator('#theme-toggle').click();
  if (await page.locator('html').getAttribute('data-theme') !== 'dark') throw Error('Theme did not change');
  await page.reload();
  if (await page.locator('html').getAttribute('data-theme') !== 'dark') throw Error('Theme preference not persisted');
  await page.screenshot({ path: 'visual-qa/home-dark-mobile.png', fullPage: true });
  await context.close();
  report.push({ name: 'navigation-and-theme', status: 200 });
} finally {
  await browser.close();
  await writeFile('visual-qa/report.json', JSON.stringify(report, null, 2));
}
console.log('Mobile / desktop browser checks completed: ' + report.length);
