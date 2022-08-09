import {getScriptByName} from '../getScriptByName.js';
import {getUserConfig} from '../getUserConfig.js';
import {parseUserConfig} from '../parseUserConfig.js';
import {runScript} from '../runScript.js';

export async function runCommand(argv) {
  const {config: configPath, name, skip} = argv;

  const userConfig = await getUserConfig(configPath);
  const parsedUserConfig = parseUserConfig(userConfig);

  const script = getScriptByName(parsedUserConfig, name);

  if (skip) {
    runScript(script);
  } else {
    const keys = name.split('.');
    keys
      .reduce((prev, cur) => {
        const lastArr = prev[prev.length - 1] ?? [];
        return [...prev, lastArr.concat(cur)];
      }, [])
      .forEach(name => {
        const script = getScriptByName(parsedUserConfig, name.join('.'));
        runScript(script);
      });
  }
}
