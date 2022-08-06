export type ScriptObject = {
  alias?: string;
  script: string;
  desc?: string;
  scripts?: Script[];
  env?: {
    [key: string]: string;
  };
};

export type Script = string | [script: string, desc: string] | ScriptObject;

export interface Config {
  [name: string]: Script;
}

export interface ParsedConfig {
  [name: string]: ScriptObject;
}
