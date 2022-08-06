/**
 * @param {import('./types').ParsedConfig} config
 * @param {string} scriptName
 * @returns {import('./types').ScriptObjectValue}
 * @description Find and get script object value by name
 * @example getScriptObjectByName(getConfig(), 'build.build-component') will find "build-component" script object value under "build" child scripts
 */
export function getScriptByName(parsedConfig, scriptName) {
  const keys = scriptName.split('.');
  return keys.reduce(
    (prev, key) => {
      if (!prev?.scripts?.[key]) {
        throw new Error(`Cannot find "${scriptName}" script in config`);
      }
      return prev.scripts[key];
    },
    {scripts: parsedConfig}
  );
}
