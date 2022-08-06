export type ScriptObjectValue = {
  alias?: string;
  command: string;
  desc?: string;
  scripts?: ScriptValue[];
  env?: {
    [key: string]: string;
  };
};

export type ScriptValue = string | [script: string, desc: string] | ScriptObjectValue;

export interface Config {
  [name: string]: ScriptValue;
}

export interface ParsedConfig {
  [name: string]: ScriptObjectValue;
}
