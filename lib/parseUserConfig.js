const excludeScriptNames = ['better-scripts', 'scripts', '$schema', '//'];

/** Parse user config value into Script object
 * @param {import('./types').Valueof<import('./types').UserConfig>} value
 */
function parseUserConfigValue(name, value) {
  /** @type {import('./types').Script} */
  const script = {
    name
  };

  // string
  if (typeof value === 'string') script.command = value;

  // array
  if (Array.isArray(value)) {
    script.command = value[0];
    script.desc = value[1];
  }

  // object
  if (!Array.isArray(value) && typeof value === 'object') {
    const {
      alias,
      command,
      desc,
      describe,
      description,
      scripts,
      prescript,
      prescripts,
      postscript,
      postscripts,
      env
    } = value;
    script.alias = alias;
    script.command = command;
    script.desc = desc ?? describe ?? description;
    script.scripts = scripts && parseUserConfig(scripts);
    script.prescript = prescript;
    script.prescripts = prescripts;
    script.postscript = postscript;
    script.postscripts = postscripts;
    script.env = env;
  }

  return script
}

/** Parse user config
 * @param {import('./types').UserConfig} userConfig
 * @returns {import('./types').ParsedUserConfig}
 */
export function parseUserConfig(userConfig) {
  const entries = Object.entries(userConfig).map(([name, value]) => [
    name,
    parseUserConfigValue(name, value)
  ]);

  const filteredEntries = entries.filter(
    ([name, value]) =>
      !excludeScriptNames.includes(name) && !name.startsWith('//')
  );

  const fromEntries = Object.fromEntries(filteredEntries);

  return fromEntries;
}
