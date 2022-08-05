import child_process from 'node:child_process';
import chalk from 'chalk';

/**
 * @param {import('./types').Task} task
 */
export function runTask(task) {
  if (!task) throw new Error('Task is not defined');

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
