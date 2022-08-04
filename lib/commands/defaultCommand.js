import prompts from 'prompts';
import {getConfig} from '../getConfig.js';
import child_process from 'node:child_process';
import {parseConfigTasks} from '../parseConfigTasks.js';
import chalk from 'chalk';

export async function defaultCommand(argv) {
  const {config: specifiedConfigPath} = argv;

  /** @type {import('../types.js').BeginConfig} */
  const config = getConfig(specifiedConfigPath);

  /** @type {{task: import('../types.js').TaskObjectForm}} */
  const {task} = await prompts({
    type: 'autocomplete',
    name: 'task',
    message: 'Select a task to run',
    suggest: (input, choices) =>
      Promise.resolve(
        choices.filter(choice =>
          choice.title.toLowerCase().includes(input.toLowerCase())
        )
      ),
    clearFirst: true,
    choices: parseConfigTasks(config).map(({name, script, description}) => ({
      title: name ?? script,
      value: {name, script, description},
      description
    }))
  });

  if (task) {
    console.log();
    console.log(
      `${chalk.bgMagenta.bold(' Task ➤_ ')} ${chalk.magenta.bold(
        task.description
      )}
      `
    );
    console.log(chalk.grey(task.script));
    child_process.spawnSync(
      task.script.split(' ')[0],
      task.script.split(' ').slice(1),
      {stdio: 'inherit', shell: true}
    );
    console.log();
  }
}
