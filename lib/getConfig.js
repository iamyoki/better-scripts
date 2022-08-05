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
    } catch {
      throw new Error(`Config file "${specifiedConfigPath}" is not found`);
    }
  } else {
    result = explorerSync.search();
    if (!result || result.isEmpty)
      throw new Error('Please add ".beginrc.json" in the root directory')
  }

  return result.config;
}
