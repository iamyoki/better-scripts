export class Script {
  name;

  alias;

  desc;

  command;

  /** @type {{[key: string]: Script}} */
  scripts;

  /** @type {Script} */
  prescript;

  /** @type {Script} */
  postscript;

  env;

  /** @type {Script} */
  parent;

  get prescript() {
    if (this.prescript) return this.prescript;
    if (this.parent) return this.parent.scripts[`prev${this.name}`];
  }

  get postscript() {
    if (this.postscript) return this.postscript;
    if (this.parent) return this.parent.scripts[`post${this.name}`];
  }

  get isPreScript() {
    return this.parent?.scripts[`prev${this.name}`];
  }

  get isPostScript() {
    return this.parent?.scripts[`post${this.name}`];
  }

  get isRoot() {
    return !this.parent;
  }

  get isScriptsEmpty() {
    return this.scripts && !!Object.keys(this.scripts).length;
  }

  constructor({
    name,
    alias,
    desc,
    command,
    scripts,
    prescript,
    postscript,
    env,
    parent
  } = {}) {
    this.name = name;
    this.alias = alias;
    this.desc = desc;
    this.command = command;
    this.scripts = scripts;
    this.prescript = prescript;
    this.postscript = postscript;
    this.env = env;
    this.parent = parent;
  }
}
