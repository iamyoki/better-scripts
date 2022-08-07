/**
 * Script array form value
 */
export type ScriptArrayValue = [scriptName: string, desc: string];

/**
 * Script object form value
 */
export type ScriptObjectValue = {
  /**Aliase displayed in place of script name, for emoji purpose */
  alias?: string;
  /**Command to execute */
  command?: string;
  /**Description for the script */
  desc?: string;
  /**Child scripts that need to be prompts after */
  scripts?: Config;
  /**Set environment variables for the script */
  env?: {
    [key: string]: string;
  };
};

/**
 * Script value, can be either string, array or object
 */
export type ScriptValue = string | ScriptArrayValue | ScriptObjectValue;

/**
 * The shape of user's config file
 */
export interface Config {
  /**
   * @param name Script name
   */
  [name: string]: ScriptValue;
}

/**
 * The shape of internal parsed config file
 */
export interface ParsedConfig {
  [name: string]: ScriptObjectValue;
}
