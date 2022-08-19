import chalk from 'chalk';
import {execSync} from './execSync.js';

/**
 * @param {import('./types.js').Script} script
 * @param {Promise<import('./types.js').ParsedUserConfig>} next
 */
export async function runScript(script, next) {
  const {prescript, postscript, isPrescript, isPostscript, env} = script;

  // prev
  if (prescript) {
    prescript.isPrescript = true;
    await runScript(prescript, next);
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

  if (script.scripts && next && typeof next === 'function')
    await next(script.scripts);

  // post
  if (postscript) {
    postscript.isPostscript = true;
    await runScript(postscript, next);
  }
}
