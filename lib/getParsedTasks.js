import chalk from 'chalk';

/**
 * @param {import('./types').Task[]} tasks
 * @param {import('./types').TaskObjectForm} [parentTask]
 * @returns {import('./types').TaskObjectForm[]}
 */
export function getParsedTasks(tasks, parentTask) {
  if (!tasks?.length) throw new Error('Config "tasks" field is incorrect');

  return tasks.map((task, index) => {
    let id, name, script, description, desc, options;

    id = parentTask ? `${parentTask.id}-${index}` : index;

    // Get value from array or object form
    if (Array.isArray(task)) {
      if (!task.length) throw new Error('Config "tasks" field is incorrect');

      const lastValue = task[task.length - 1];

      if (task.length === 1) {
        [script] = task;
      }

      if (task.length === 2 && typeof lastValue === 'object') {
        [script, options] = task;
      }

      if (task.length === 2 && typeof lastValue !== 'object') {
        [script, description] = task;
      }

      if (task.length === 3 && typeof lastValue === 'object') {
        [name, script, options] = task;
      }

      if (task.length === 3 && typeof lastValue !== 'object') {
        [name, script, description] = task;
      }

      if (task.length >= 4 && typeof lastValue === 'object') {
        [name, script, description, options] = task;
      }

      if (task.length >= 4 && typeof lastValue !== 'object') {
        [name, script, description] = task;
      }
    } else {
      ({id, name, script, description, desc, ...options} = task);
    }

    // Handle value
    if (!script) throw new Error('"script" field is missing in task');

    if (!name) name = script;

    if (description) desc = description;
    if (desc) description = desc;
    if (!description && !desc) description = desc = script;

    return {
      name,
      script,
      description,
      ...options
    };
  });
}
