#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {defaultCommand} from '../lib/commands/defaultCommand.js';
import {listCommand} from '../lib/commands/listCommand.js';
import {errorHandler} from '../lib/errorHandler.js';
import {getPkg} from '../lib/getPkg.js';

const pkg = getPkg();

process.on('uncaughtException', errorHandler);
process.on('unhandledRejection', errorHandler);

if (hideBin(process.argv).includes('--track')) {
  process.env.TRACK_ERROR = 'true';
}

const argv = yargs(hideBin(process.argv))
  .usage(chalk.magenta('\n' + pkg.description))
  .option('config', {
    alias: 'c',
    desc: 'Specified config filepath',
    type: 'string'
  })
  .option('track', {
    desc: 'Show tracked error stack message'
  })
  .help('help')
  .alias('help', 'h')
  .alias('version', 'v')
  .command('$0', 'Run your script', {}, defaultCommand)
  .command('list [name]', 'Show all scripts', {}, listCommand)
  .strict(true)
  .example('npx $0')
  .fail((msg, err, yargs) => {
    if (err) throw err; // preserve stack
    if (msg) throw new Error(msg);
  }).argv;
