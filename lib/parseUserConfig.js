const excludeNameRegexp = [/^\/\//, /^(scripts|\$schema|better-scripts)$/];

/** Parse user config
 * @param {import('./types').UserConfig} userConfig
 * @returns {import('./types').ParsedUserConfig}
 */
export function parseUserConfig(userConfig) {
  const entries = Object.entries(userConfig).map(([name, value]) => [
    name,
    parseUserConfigValue(
      name,
      value,
      userConfig['pre' + name],
      userConfig['post' + name]
    )
  ]);

  const filteredEntries = entries.filter(
    ([name, value]) => !excludeNameRegexp.some(reg => reg.test(name))
  );

  const parsedUserConfig = Object.fromEntries(filteredEntries);

  // Remove prev, post keys if script exists
  for (const key in parsedUserConfig) {
    const [, name] = key.match(/^pre(.*)/) ?? [];
    if (name) delete parsedUserConfig[key];
  }

  return parsedUserConfig;
}

/** Parse user config value into Script object
 * @param {import('./types').Valueof<import('./types').UserConfig>} value
 * @param {import('./types').Valueof<import('./types').UserConfig>} prevalue
 * @param {import('./types').Valueof<import('./types').UserConfig>} postvalue
 */
function parseUserConfigValue(name, value, prevalue, postvalue) {
  /** @type {import('./types').Script} */
  const script = {
    name,
    prescript: prevalue && parseUserConfigValue('pre' + name, prevalue),
    postscript: postvalue && parseUserConfigValue('post' + name, postvalue)
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
      postscript,
      env
    } = value;

    script.alias = alias;
    script.command = command;
    script.desc = desc ?? describe ?? description;
    script.scripts = scripts && parseUserConfig(scripts);
    if (prescript)
      script.prescript = {
        name: 'pre' + script.name,
        command: prescript?.command,
        desc: prescript?.desc ?? prescript?.describe ?? prescript?.description
      };
    if (postscript)
      script.postscript = {
        name: 'post' + script.name,
        command: postscript?.command,
        desc:
          postscript?.desc ?? postscript?.describe ?? postscript?.description
      };
    script.env = env;
  }

  return script;
}
