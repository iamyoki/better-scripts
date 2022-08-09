/**
 * @param {import('./types').ParsedUserConfig} parsedUserConfig
 * @param {string} name
 * @returns {import('./types').Script}
 */
export function getScriptByName(parsedUserConfig, name) {
  const keys = name.split('.');

  return keys.reduce(
    (prev, key) => {
      if (!prev.scripts[key]) {
        throw new Error(`Cannot find "${key}" script in config`);
      }
      return prev.scripts[key];
    },
    {scripts: parsedUserConfig}
  );
}
