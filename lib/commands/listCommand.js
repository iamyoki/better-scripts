import CliTable3 from 'cli-table3';
import {getScriptByName} from '../getScriptByName.js';
import {getUserConfig} from '../getUserConfig.js';
import {parseUserConfig} from '../parseUserConfig.js';

export async function listCommand(argv) {
  const {config: configPath, name, compact} = argv;

  const userConfig = await getUserConfig(configPath);
  const parsedUserConfig = parseUserConfig(userConfig);
  const scripts = name
    ? getScriptByName(parsedUserConfig, name).scripts
    : parsedUserConfig;

  // List one's child scripts
  if (!scripts) throw new Error(`Script "${name}" doesn't have child scripts`);

  const table = new CliTable3({
    head: ['Name', 'Command', 'Description', 'Scripts'],
    style: {
      compact,
      head: ['magenta']
    }
  });

  table.push(
    ...Object.values(scripts).map((script, index) => [
      script.name,
      script.command,
      script.desc,
      script.scripts && Object.keys(script.scripts).join('\n')
    ])
  );

  console.log(table.toString());
}
