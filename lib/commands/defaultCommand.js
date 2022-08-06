import prompts from 'prompts';
import {getConfig} from '../getConfig.js';
import child_process from 'node:child_process';
import {getParsedTasks} from '../getParsedTasks.js';
import chalk from 'chalk';
import {runTask} from '../runTask.js';

export async function defaultCommand(argv) {
  const {config: specifiedConfigPath} = argv;

  /** @type {import('../types.js').BeginConfig} */
  const config = getConfig(specifiedConfigPath);

  console.log(config)

  return

  const choices = getParsedTasks(config.tasks).map(task => ({
    title: task.name,
    value: task,
    description: task.description
  }));

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
    choices
  });

  if (task) runTask(task);
}
