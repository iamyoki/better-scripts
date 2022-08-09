export type Valueof<T> = T[keyof T];

export interface Script {
  name: string;
  alias?: string;
  command?: string;
  desc?: string;
  scripts?: {[key: string]: Script};
  prescript?: Script;
  postscript?: Script;
  prescripts?: Script['scripts'];
  postscripts?: Script['scripts'];
  env?: {
    [key: string]: string;
  };
}

export interface UserConfig {
  [key: string]:
    | string
    | [string, string]
    | (Omit<Script, 'name' | 'scripts'> & {
        description?: string;
        describe?: string;
        scripts?: UserConfig;
      });
}

export type ParsedUserConfig = Script['scripts'];
