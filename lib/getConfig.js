import {cosmiconfigSync} from 'cosmiconfig';
import {getPkg} from './getPkg.js';

/**
 * @param {string} name
 * @param {import('./types').ScriptValue} script
 * @returns {import('./types').ScriptObjectValue}
 */
function parseScriptValue(name, script) {
  if (typeof script === 'string') {
    return {
      command: script
    };
  }

  if (
    typeof script === 'object' &&
    Array.isArray(script) &&
    script.length >= 2
  ) {
    const [command, desc] = command;
    return {
      command,
      desc
    };
  }

  if (typeof script === 'object') {
    if ('command' in script === false) {
      throw new Error(
        `Script "${name}" validation failed, missing "command" field`
      );
    }
    return script;
  }

  throw new Error('Script validation failed');
}

/**
 * @param {import('./types').Config} config
 * @returns {import('./types').ParsedConfig}
 */
function parseConfig(config) {
  return Object.fromEntries(
    Object.entries(config).map(([name, script]) => [
      name,
      parseScriptValue(name, script)
    ])
  );
}

/**
 * @param {string} specifiedConfigPath
 * @returns {import('./types').ParsedConfig}
 */
export function getConfig(specifiedConfigPath) {
  const explorerSync = cosmiconfigSync('better-scripts', {
    transform: result =>
      result?.config && {
        ...result,
        config: parseConfig(result.config)
      }
  });

  /** @type {import('./types').ParsedConfig} */
  let config;

  // Specified config path or search
  if (specifiedConfigPath) {
    try {
      const result = explorerSync.load(specifiedConfigPath);
      config = result.config;
    } catch {
      throw new Error(`Config file "${specifiedConfigPath}" is not found`);
    }
  } else {
    const result = explorerSync.search();
    const pkg = getPkg();

    if (result?.config) {
      config = result.config;
    } else if (pkg.scripts) {
      config = parseConfig(pkg.scripts);
    } else {
      throw new Error(
        'Config validation failed, you probably forgot to write ”better-scripts“ in package.json or "scripts.json" config file'
      );
    }
  }

  return config;
}
