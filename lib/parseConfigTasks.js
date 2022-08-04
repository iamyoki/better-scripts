import chalk from 'chalk';

/**
 * @param {import('./types').BeginConfig} config
 * @returns {import('./types').TaskObjectForm[]}
 */
export function parseConfigTasks(config) {
  return config.tasks.map(task => {
    let name, script, description;

    if (task.length < 2) {
      throw console.log(chalk.red('Config validation error: task type wrong'));
    }
    if (task.length === 2) {
      [script, description] = task;
    }
    if (task.length > 2) {
      [name, script, description] = task;
    }

    return {
      name,
      script,
      description
    };
  });
}
