import {writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {execSync} from '../lib/execSync.js';
import chalk from 'chalk';

const require = createRequire(import.meta.url);

// sort
const config = require('../scripts.json');
const sortedConfig = sort(config);
const configPath = require.resolve('../scripts.json');
writeFileSync(configPath, JSON.stringify(sortedConfig, null, 2));
console.log(
  chalk.green('📄 Config file sorted:'),
  chalk.bgGreen(`${configPath}`)
);

// format
execSync(`npx --yes prettier --write ${configPath}`, {
  stdio: 'ignore'
});
console.log(
  chalk.green('📄 Config file formated:'),
  chalk.bgGreen(`${configPath}`)
);

function sort(obj) {
  return Object.fromEntries(
    Object.entries(obj)
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([key, value]) => [
        key,
        typeof value === 'object' ? sort(value) : value
      ])
  );
}
