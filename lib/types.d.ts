export type Valueof<T> = T[keyof T];

export interface Script {
  name: string;
  alias?: string;
  command?: string;
  desc?: string;
  scripts?: {[key: string]: Script};
  prescript?: Script;
  postscript?: Script;
  env?: {
    [key: string]: string;
  };
}

export interface UserConfig {
  [key: string]:
    | string
    | [string, string]
    | {
        alias?: string;
        command?: string;
        desc?: string;
        description?: string;
        describe?: string;
        scripts?: UserConfig;
        prescript?: Valueof<UserConfig>;
        postscript?: Valueof<UserConfig>;
        env?: {
          [key: string]: string;
        };
      };
}

export type ParsedUserConfig = Script['scripts'];
