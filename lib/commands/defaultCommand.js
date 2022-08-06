import prompts from 'prompts';
import {getConfig} from '../getConfig.js';
import {runScript} from '../runScript.js';

export async function defaultCommand(argv) {
  const {config: specifiedConfigPath} = argv;

  const config = getConfig(specifiedConfigPath);

  const choices = Object.entries(config).map(([name, script]) => ({
    title: script.alias ?? name,
    value: {name, ...script},
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

  if (selected) {
    const {name, script} = selected;
    runScript(name, script);
  }
}
