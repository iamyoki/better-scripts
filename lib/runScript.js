import chalk from 'chalk';
import {execSync} from './execSync.js';

/**
 * @param {import('./types.js').Script} script
 */
export function runScript(script) {
  // pre
  if (script.prescript) {
    console.log(
      `\n${chalk.bgGrey.bold(' PREV ➤ ')} ${chalk.magenta.bold(
        script.prescript.desc ?? script.prescript.name
      )}`
    );

    if (script.prescript.command) {
      console.log(chalk.grey(script.prescript.command));
      execSync(script.prescript.command);
      console.log();
    }
  }

  // now
  console.log(
    `\n${chalk.bgMagenta.bold(' RUNS ➤ ')} ${chalk.magenta.bold(
      script.desc || script.name
    )}`
  );

  if (script.command) {
    console.log(chalk.grey(script.command));
    execSync(script.command);
    console.log();
  }

  // post
  if (script.postscript) {
    console.log(
      `\n${chalk.bgGrey.bold(' POST ➤ ')} ${chalk.magenta.bold(
        script.postscript.desc ?? script.postscript.name
      )}`
    );

    if (script.postscript.command) {
      console.log(chalk.grey(script.postscript.command));
      execSync(script.postscript.command);
      console.log();
    }
  }
}
