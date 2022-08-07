import chalk from 'chalk';
import {execSync} from './execSync.js';

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

  if (!scriptObject.command) return;

  console.log(chalk.grey(scriptObject.command));
  execSync(scriptObject.command);
  console.log();
}
