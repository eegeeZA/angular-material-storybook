// Usage: node scripts/check-site.mts [base URL of a deployed or served storybook-static]
import { chromium } from 'playwright';

const liveUrl = 'https://eegeeza.github.io/angular-material-storybook/';
const baseUrl = (process.argv[2] ?? liveUrl).replace(/\/$/, '');
const primary = 'rgb(0, 92, 187)';

const browser = await chromium.launch();
const page = await browser.newPage();
const problems = [];
let responses = 0;
page.on('response', (response) => {
  responses += 1;
  if (response.status() >= 400) problems.push(`${response.status()} ${response.url()}`);
});
page.on('requestfailed', (request) =>
  problems.push(`failed ${request.url()} ${request.failure()?.errorText}`),
);
page.on('pageerror', (error) => problems.push(`pageerror ${error.message}`));

await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
if ((await page.locator('#storybook-preview-iframe').count()) === 0)
  problems.push('manager: no preview iframe');

const indexResponse = await fetch(`${baseUrl}/index.json`);
const entries = indexResponse.ok ? Object.values((await indexResponse.json()).entries) : [];
if (entries.length === 0) problems.push(`index.json: ${indexResponse.status}, no entries`);

let buttons = 0;
let icons = 0;
for (const { id, type } of entries) {
  await page.goto(`${baseUrl}/iframe.html?id=${id}&viewMode=${type}`, {
    waitUntil: 'networkidle',
  });
  await page.evaluate(() => document.fonts.ready);
  const result = await page.evaluate(() => ({
    rendered: document.querySelector('#storybook-root > *, #storybook-docs > *') !== null,
    error: document.body.classList.contains('sb-show-errordisplay'),
    buttons: [
      ...document.querySelectorAll('#storybook-root .mat-mdc-unelevated-button:not([disabled])'),
    ].map((button) => getComputedStyle(button).backgroundColor),
    icons: [...document.querySelectorAll('#storybook-root mat-icon')].map((icon) => ({
      className: icon.className,
      fontFamily: getComputedStyle(icon).fontFamily,
      width: icon.getBoundingClientRect().width,
    })),
    symbolsFaces: [...document.fonts].filter(
      (face) => face.family.includes('Material Symbols Outlined') && face.status === 'loaded',
    ).length,
  }));
  if (!result.rendered || result.error) problems.push(`${id}: not rendered`);
  for (const background of result.buttons) {
    buttons += 1;
    if (background !== primary) problems.push(`${id}: filled button is ${background}`);
  }
  for (const icon of result.icons) {
    icons += 1;
    const ok =
      icon.className.includes('material-symbols-outlined') &&
      icon.fontFamily.includes('Material Symbols Outlined') &&
      icon.width === 24 &&
      result.symbolsFaces > 0;
    if (!ok) problems.push(`${id}: icon ${JSON.stringify(icon)}, ${result.symbolsFaces} faces`);
  }
}
await browser.close();

if (buttons === 0) problems.push('no filled button found');
if (icons === 0) problems.push('no icon found');
const summary = { baseUrl, entries: entries.length, responses, buttons, icons, problems };
console.log(JSON.stringify(summary, null, 1));
process.exit(problems.length ? 1 : 0);
