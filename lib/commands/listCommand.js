import CliTable3 from 'cli-table3';
import {getConfig} from '../getConfig.js';
import {getScriptByName} from '../getScriptByName.js';

export function listCommand(argv) {
  const {config: specifiedConfigPath, name} = argv;

  let config = getConfig(specifiedConfigPath);

  if (name) {
    const valueByName = getScriptByName(config, name);
    if (!valueByName?.scripts)
      throw new Error(`Script ${name} doesn't have child scripts`);
    config = valueByName.scripts;
  }

  const table = new CliTable3({
    head: ['Name', 'Command', 'Description', 'Child scripts']
  });

  table.push(
    ...Object.entries(config).map(([name, script], index) => [
      name,
      script.command,
      script.desc,
      script.scripts && Object.keys(script.scripts).join(', ')
    ])
  );

  console.log(table.toString());
}
