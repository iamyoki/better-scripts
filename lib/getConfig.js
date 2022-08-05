import chalk from 'chalk';
import {cosmiconfigSync} from 'cosmiconfig';

/**Get begin config file */
export function getConfig(specifiedConfigPath) {
  const explorerSync = cosmiconfigSync('begin');

  /** @type {import('cosmiconfig/dist/types').CosmiconfigResult} */
  let result;

  // specified config path or search
  if (specifiedConfigPath) {
    try {
      result = explorerSync.load(specifiedConfigPath);
      throw '';
    } catch {
      throw console.log(
        chalk.red(`\nConfig file "${specifiedConfigPath}" is not found`)
      );
    }
  } else {
    result = explorerSync.search();
    if (!result || result.isEmpty)
      throw console.log(
        chalk.red('\nPlease add ".beginrc.json" in the root directory\n')
      );
  }

  return result.config;
}
