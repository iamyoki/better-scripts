import chalk from 'chalk';

/**
 * @param {import('./types').BeginConfig} config
 * @returns {import('./types').TaskObjectForm[]}
 */
export function getParsedTasks(config) {
  if(!config?.tasks?.length) throw new Error('Config "tasks" field is incorrect')

  return config.tasks.map(task => {
    let name, script, description;

    if (Array.isArray(task)) {
      if (!task.length)
        throw new Error('Config "tasks" field is incorrect')

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
