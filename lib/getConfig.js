import {cosmiconfigSync} from 'cosmiconfig';
import {getUserPkg} from './getUserPkg.js';

const pkg = getUserPkg();

const excludeScriptNames = ['better-scripts', 'scripts', '$schema', '//'];

/**
 * @param {string} name
 * @param {import('./types').ScriptValue} script
 * @returns {import('./types').ScriptObjectValue}
 */
function parseScriptValue(name, script) {
  // script string value e.g. {"dev": "react-scripts start"}
  if (typeof script === 'string') {
    return {
      command: script
    };
  }

  // script array value e.g. {"dev": ["react-scripts start", "Start a development server"]}
  if (
    typeof script === 'object' &&
    Array.isArray(script) &&
    script.length >= 2
  ) {
    const [command, desc] = script;
    return {
      command,
      desc
    };
  }

  // script object value e.g. {"dev": {"command": "react-scripts start"}}
  if (typeof script === 'object') {
    if ('command' in script === false && 'scripts' in script === false) {
      throw new Error(
        `Script "${name}" validation failed, missing "command" field`
      );
    }
    return {
      ...script,
      scripts: script.scripts && parseConfig(script.scripts)
    };
  }

  throw new Error('Script validation failed');
}

/**
 * @param {import('./types').Config} config
 * @returns {import('./types').ParsedConfig}
 */
function parseConfig(config) {
  return Object.fromEntries(
    Object.entries(config)
      .filter(([name]) => !excludeScriptNames.includes(name) && !name.includes('//'))
      .map(([name, script]) => [name, parseScriptValue(name, script)])
  );
}

/**
 * @param {string} specifiedConfigPath
 * @returns {import('./types').ParsedConfig}
 */
export function getConfig(specifiedConfigPath) {
  const {name: moduleName} = pkg;
  const explorerSync = cosmiconfigSync(moduleName, {
    packageProp: 'better-scripts',
    searchPlaces: [
      'package.json',
      'scripts.json',
      `${moduleName}.json`,
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.js`,
      `.${moduleName}rc.cjs`,
      `${moduleName}.config.js`,
      `${moduleName}.config.cjs`
    ],
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

    // Read "scripts" if config not found
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
