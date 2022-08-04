import chalk from 'chalk';
import {cosmiconfig, cosmiconfigSync} from 'cosmiconfig';

/**Get begin config file */
export function getConfig(specifiedConfigPath) {
  const explorerSync = cosmiconfigSync('begin');

  /** @type {import('cosmiconfig/dist/types').CosmiconfigResult} */
  let result;

  // specified config path or search
  if (specifiedConfigPath) {
    try {
      result = explorerSync.load(specifiedConfigPath);
    } catch {}
  } else {
    result = explorerSync.search();
  }

  const isNotFound = !result || result.isEmpty;

  // not found when specified
  if (specifiedConfigPath && isNotFound) {
    throw console.log(
      chalk.red(`\nConfig file "${specifiedConfigPath}" is not found\n`)
    );
  }

  // not found when search
  if (!specifiedConfigPath && isNotFound) {
    throw console.log(
      chalk.red('\nPlease add ".beginrc.json" in the root directory\n')
    );
  }

  return result.config;
}
