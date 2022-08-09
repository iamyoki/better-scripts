import chalk from 'chalk';
import {execSync} from './execSync.js';

/**
 * @param {import('./types.js').Script} script
 */
export function runScript(script) {
  console.log();
  console.log(
    `${chalk.bgMagenta.bold(' Run ➤_ ')} ${chalk.magenta.bold(
      script.desc || script.name
    )}
      `
  );

  if (!script.command) return;

  console.log(chalk.grey(script.command));
  execSync(script.command);
  console.log();
}
