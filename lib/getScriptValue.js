/**
 * @param {import('./types').ParsedConfig} config
 * @param {string} scriptName
 * @description Find and get script object value by name
 * @example getScriptValue(getConfig(), 'build.build-component') will find "build-component" script object value under "build" child scripts
 */
export function getScriptValue(parsedConfig, scriptName) {
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
