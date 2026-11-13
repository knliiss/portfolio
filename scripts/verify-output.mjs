import { stat, readFile } from 'node:fs/promises';
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
if (!en.includes('I build software products and backend systems.')) {
  throw new Error('Incorrect English homepage generated.');
}

console.log('[pages-output] All required production assets are present in: ' + root);
