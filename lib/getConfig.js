import chalk from 'chalk';
import {cosmiconfigSync} from 'cosmiconfig';

/**
 * @param {import('./types').Script} script
 * @returns {import('./types').ScriptObject}
 */
function parseScriptValue(script) {
  if (typeof script === 'string') {
    return {
      script
    };
  }

  if (
    typeof script === 'object' &&
    Array.isArray(script) &&
    script.length >= 2
  ) {
    const [script, desc] = script;
    return {
      script,
      desc
    };
  }

  if (typeof script === 'object' && 'script' in script) {
    return script;
  }

  throw new Error('Config scripts validation failed');
}

/**
 * @param {import('./types').Config} config
 * @returns {import('./types').ParsedConfig}
 */
function parseConfig(config) {
  return Object.fromEntries(
    Object.entries(config).map(([name, script]) => [
      name,
      parseScriptValue(script)
    ])
  );
}

/**Get config file */
export function getConfig(specifiedConfigPath) {
  const explorerSync = cosmiconfigSync('better-scripts', {
    transform: result =>
      result?.config && {
        ...result,
        config: parseConfig(result.config)
      }
  });

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
      throw new Error('Config validation failed. You probably forgot to write ”better-scripts“ in package.json or separate "scripts.json" file');
  }

  return result?.config;
}
