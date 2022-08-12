#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {defaultCommand} from '../lib/commands/defaultCommand.js';
import {listCommand} from '../lib/commands/listCommand.js';
import {runCommand} from '../lib/commands/runCommand.js';
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
  .command(
    'run <name>',
    'Run script non-interactive, usually in CI mode',
    {
      skip: {
        alias: 's',
        desc: 'Skip the chaining paths',
        boolean: true
      }
    },
    runCommand
  )
  .command(
    ['list [name]', 'ls [name]'],
    'Show all scripts in table',
    {
      compact: {
        desc: 'Compact mode',
        boolean: true
      }
    },
    listCommand
  )
  .example('npx $0', '- Run your script interactive')
  .example('npx $0 run dev', '- Run "dev" script non-interactive')
  .example(
    'npx $0 run build.deploy',
    '- Run "build" and "deploy" child script in chain order'
  )
  .example('npx $0 list', '- Show all scripts in table')
  .strict(true)
  .wrap(null)
  .fail((msg, err, yargs) => {
    if (err) throw err; // preserve stack
    if (msg) {
      console.log(yargs.help() + '\n');
      throw new Error(msg);
    }
  }).argv;
