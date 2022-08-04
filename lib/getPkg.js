import {createRequire} from 'node:module';

// Get internal source package.json
export function getPkg() {
  const require = createRequire(import.meta.url);
  const pkg = require('../package.json');
  return pkg;
}
