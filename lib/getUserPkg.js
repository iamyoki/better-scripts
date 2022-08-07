import {createRequire} from 'node:module';
import {pathToFileURL} from 'node:url';
import {packageDirectorySync} from 'pkg-dir';

export function getUserPkg() {
  const pkgDir = packageDirectorySync();
  const filePath = pathToFileURL(pkgDir).toString();
  const require = createRequire(filePath + '/package.json');
  const pkg = require('./package.json');
  return pkg;
}
