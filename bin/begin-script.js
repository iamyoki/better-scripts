#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {defaultCommand} from '../lib/commands/defaultCommand.js';
import {getPkg} from '../lib/getPkg.js';

const pkg = getPkg();

const argv = yargs(hideBin(process.argv))
  .usage(chalk.magenta('\n' + pkg.description))
  .command('$0', 'Begin to run', {}, defaultCommand)
  .example('npx $0', 'Begin to run')
  .option('config', {alias: 'c', desc: 'Specified config filepath.\nDefaults to ".beginrc"', type: 'string'})
  .alias('help', 'h')
  .alias('version', 'v').argv;
