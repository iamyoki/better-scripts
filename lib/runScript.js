import chalk from 'chalk';
import {execSync} from './execSync.js';

/**
 * @param {import('./types.js').Script} script
 */
export function runScript(script) {
  const {prescript, postscript, isPrescript, isPostscript, env} = script;

  // prev
  if (prescript) {
    prescript.isPrescript = true;
    runScript(prescript);
  }

  // now
  const displayName = script.desc ?? script.name;
  const logRunMessage = isPrescript
    ? `\n${chalk.bgGrey.bold(' PREV ➤ ')} ${chalk.magenta.bold(displayName)}`
    : isPostscript
    ? `\n${chalk.bgGrey.bold(' POST ➤ ')} ${chalk.magenta.bold(displayName)}`
    : `\n${chalk.bgMagenta.bold(' RUNS ➤ ')} ${chalk.magenta.bold(
        displayName
      )}`;

  console.log(logRunMessage);
  if (script.command) {
    console.log(chalk.grey(script.command));
    execSync(script.command, {
      env: {
        ...process.env,
        ...env
      }
    });
    console.log();
  }

  // post
  if (postscript) {
    postscript.isPostscript = true;
    runScript(postscript);
  }
}
