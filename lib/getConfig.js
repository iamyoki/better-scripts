import chalk from 'chalk';
import {cosmiconfig, cosmiconfigSync} from 'cosmiconfig';

/**Get begin config file */
export function getConfig(specifiedConfigPath) {
  const explorerSync = cosmiconfigSync('begin');

  /** @type {import('cosmiconfig/dist/types').CosmiconfigResult} */
  let result;

  // specified config path or search
  if (specifiedConfigPath) {
    result = explorerSync.load(specifiedConfigPath);
  } else {
    result = explorerSync.search();
  }

  const isNotFound = !result || result.isEmpty;

  // not found when specified
  if (specifiedConfigPath && isNotFound) {
    console.log(
      chalk.red(`\nConfig file not found in ${specifiedConfigPath}\n`)
    );
    return
  }

  // not found when search
  if (!specifiedConfigPath && isNotFound) {
    console.log(
      chalk.red('\nPlease add "begin.config.json" in the root directory\n')
    );
    return;
  }

  return result.config;
}
