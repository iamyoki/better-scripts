import {getConfig} from '../getConfig.js';
import {getScriptByName} from '../getScriptByName.js';
import {runScript} from '../runScript.js';

export function runCommand(argv) {
  const {config: specifiedConfigPath, name} = argv;

  const config = getConfig(specifiedConfigPath);

  // Pre validate
  getScriptByName(config, name);

  const keys = name.split('.');
  
  keys
    .reduce((prev, cur) => {
      return prev.concat(prev.concat(cur).join('.'));
    }, [])
    .forEach(name => {
      const scriptValue = getScriptByName(config, name);
      runScript(name, scriptValue);
    });
}
