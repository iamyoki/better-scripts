import chalk from 'chalk';

export function errorHandler(err) {
  console.error(chalk.bgRed.bold(err.name));
  console.error(chalk.red(err.message));
  if (process.env.TRACK_ERROR === 'true') console.error(chalk.red(err.stack));
  process.exit(1);
}
