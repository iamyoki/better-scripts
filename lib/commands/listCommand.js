import CliTable3 from 'cli-table3';
import {getConfig} from '../getConfig.js';


export function listCommand(argv) {
  const {config: specifiedConfigPath} = argv;

  const config = getConfig(specifiedConfigPath);

  const table = new CliTable3({
    head: ['Name', 'Command', 'Description', 'Scripts']
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
