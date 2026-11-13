import { stat, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve('dist');
const required = [
  'index.html',
  'en/index.html',
  'uk/index.html',
  'en/work/mnemos/index.html',
  'en/work/wavecode/index.html',
  'en/work/c7xbotmanager/index.html',
  'en/work/studium/index.html',
  '__deploy-check.txt',
];

for (const file of required) {
  const path = resolve(root, file);
  let bytes;
  try {
    const result = await stat(path);
    if (!result.isFile() || result.size === 0) throw new Error('empty or non-file');
    bytes = result.size;
  } catch (error) {
    throw new Error('Missing Pages output file: ' + path, { cause: error });
  }
  console.log('[pages-output] ' + file + ' (' + bytes + ' bytes)');
}

const en = await readFile(resolve(root, 'en/index.html'), 'utf8');
if (!en.includes('Backend systems. Software products.')) {
  throw new Error('Incorrect English homepage generated.');
}

console.log('[pages-output] All required production assets are present in: ' + root);

function currentCommit() {
  for (const value of [process.env.CF_PAGES_COMMIT_SHA, process.env.GITHUB_SHA]) {
    if (value && /^[a-f0-9]{7,40}$/i.test(value)) return value;
  }
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

const build = {
  commit: currentCommit(),
  builtAt: new Date().toISOString(),
  site: 'portfolio.knalis.rest',
  source: 'knliiss/portfolio'
};
await writeFile(resolve(root, '__build.json'), JSON.stringify(build, null, 2) + '\n', 'utf8');
console.log('[pages-output] Deployment marker: ' + build.commit + ', built ' + build.builtAt);
