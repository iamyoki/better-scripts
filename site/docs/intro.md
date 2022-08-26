---
sidebar_position: 1
---

# Introduction

Better scripts is **a better way, a CLI tool, a consistent conventional** that helps you organize and make better use of your npm scripts.

## The benefits

⚡️ Forget about reading redundant `package.json` and start doing everything you want with just **one single command**.

💅🏻 Human readable **description** and **emoji** for your scripts.

🔎 **Searchable interactive CLI tool** to help you find the command you want to run faster.

🧠 **Consistent convention** to reduce your cognitive load on different projects.

✂️ **Simplify your package.json** and separate npm scripting to another file like `scripts.json`.

⚙️ A more powerful **script runner** that can inject **cross-platform envs**, execute commands in **serialized** and **parallel** way even **chaining**.

## Quick examples

:::tip

These examples only show you how it works like, if you already know please follow [Getting Started](/docs/getting-started/installation).

:::

Start by one-time command `npx better-scripts`, and you will get this.

<img src="/example-at-first.png" width="500" />

<br /><br />

Now add some descriptions for your scripts into separate `scripts.json` file in root.

```json title="scripts.json"
{
  "dev": {
    "alias": "🌟 Dev",
    "command": "yarn start",
    "desc": "Start a development server"
  },
  "build": {
    "alias": "📦 Build",
    "command": "yarn build",
    "desc": "Create a production build"
  },
  "test": {
    "alias": "🧪 Test",
    "command": "yarn test",
    "desc": "Run tests"
  }
}

```

Run again, it's cool!

<img src="/example-at-then.png" width="500" />

<br /><br />

Shows a table list for all of your scripts by running `list` command

<img src="/example-list.png" width="500" />

<br /><br />

Use as a runner without interactive

<img src="/example-runner.png" width="500" />
