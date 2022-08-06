import prompts from 'prompts';
import {getConfig} from '../getConfig.js';
import {runScript} from '../runScript.js';

/**
 * @param {import('../types.js').ParsedConfig} parsedConfig
 */
async function promptsAndRun(parsedConfig) {
  const choices = Object.entries(parsedConfig).map(([name, script]) => ({
    title: script.alias ?? name,
    value: {name, script},
    description: script.desc ?? script.command
  }));

  /** @type {{selected: {name: string; ...script: import('../types.js').ScriptObjectValue}}} */
  const {selected} = await prompts({
    type: 'autocomplete',
    name: 'selected',
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

  if (!selected) process.exit(0);

  runScript(selected.name, selected.script);

  // Recursive call if have child scripts
  const {scripts} = selected.script;
  if (scripts) {
    await promptsAndRun(selected.script?.scripts);
  }
}

export function defaultCommand(argv) {
  const {config: specifiedConfigPath} = argv;
  const config = getConfig(specifiedConfigPath);
  promptsAndRun(config);
}
