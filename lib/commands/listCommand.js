import CliTable3 from 'cli-table3';
import {getConfig} from '../getConfig.js';
import {getParsedTasks} from '../getParsedTasks.js';

export function listCommand(argv) {
  const {config: specifiedConfigPath} = argv;

  /** @type {import('../types.js').BeginConfig} */
  const config = getConfig(specifiedConfigPath);

  const tasks = getParsedTasks(config.tasks);

  const table = new CliTable3({
    head: ['ID', 'Name', 'Script', 'Description']
  });

  table.push(
    ...tasks.map((task, index) => [
      task.id ?? index,
      task.name,
      task.script,
      task.description
    ])
  );

  console.log(table.toString());
}
