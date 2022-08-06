import child_process from 'node:child_process';
import chalk from 'chalk';

/**
 * @param {string} scriptName
 * @param {import('./types').ScriptObjectValue} scriptObject
 */
export function runScript(scriptName, scriptObject) {
  console.log();
  console.log(
    `${chalk.bgMagenta.bold(' Run ➤_ ')} ${chalk.magenta.bold(
      scriptObject.desc || scriptName
    )}
      `
  );
  console.log(chalk.grey(scriptObject.command));
  child_process.spawnSync(
    scriptObject.command.split(' ')[0],
    scriptObject.command.split(' ').slice(1),
    {stdio: 'inherit', shell: true}
  );
  console.log();
}
