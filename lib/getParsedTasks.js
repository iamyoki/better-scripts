import chalk from 'chalk';

/**
 * @param {import('./types').BeginConfig} config
 * @returns {import('./types').TaskObjectForm[]}
 */
export function getParsedTasks(config) {
  return config.tasks.map(task => {
    let name, script, description;

    if (Array.isArray(task)) {
      if (!task.length)
        throw console.log(
          chalk.red('Config validation error: task type wrong')
        );

      if (task.length === 1) {
        [name] = [script] = [description] = task;
      }

      if (task.length === 2) {
        [name] = [script, description] = task;
      }

      if (task.length > 2) {
        [name, script, description] = task;
      }
    } else {
      ({name, script, description} = task);
    }

    return {
      name,
      script,
      description
    };
  });
}
