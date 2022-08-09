import prompts from 'prompts';
import {getUserConfig} from '../getUserConfig.js';
import {parseUserConfig} from '../parseUserConfig.js';
import {runScript} from '../runScript.js';

/**
 * @param {import('../types').ParsedUserConfig} parsedUserConfig
 */
async function promptsAndRun(parsedUserConfig) {
  const choices = Object.values(parsedUserConfig).map(script => {
    if (!script) throw new Error('Failed parsing config script');
    return {
      title: script.alias ?? script.name,
      value: script,
      description: script.desc ?? script.command
    };
  });

  /** @type {{script: import('../types.js').Script}} */
  const {script} = await prompts({
    type: 'autocomplete',
    name: 'script',
    message: 'Select a script to run',
    suggest: (input, choices) =>
      Promise.resolve(
        choices.filter(choice =>
          choice.title.toLowerCase().includes(input.toLowerCase())
        )
      ),
    clearFirst: true,
    choices
  });

  // Exit if no script value
  if (!script) process.exit(0);

  // Run script
  runScript(script);

  // Recursive call if have child scripts
  if (script.scripts) {
    await promptsAndRun(script.scripts);
  }
}

export async function defaultCommand(argv) {
  const {config: configPath} = argv;

  const userConfig = await getUserConfig(configPath);
  const parsedUserConfig = parseUserConfig(userConfig);

  await promptsAndRun(parsedUserConfig);
}
