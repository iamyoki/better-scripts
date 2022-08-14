<br />

<h1 align="center">
  <img src="./static/logo.png" alt="example" width="400px" />
</h1>

<br>

<p align="center"><strong>A better way to organize your npm scripts</strong></p>
<br>

<p align="center">
  <img src="./static/example2.png" alt="example" width="460px" />
</p>

*   [Installation](#installation)
*   [Usage](#usage)
    *   [Basic setup](#basic-setup)
    *   [Add script description](#add-script-description)
    *   [Script as object](#script-as-object)
    *   [Separate configuration file](#separate-configuration-file)
    *   [Specified configuration file](#specified-configuration-file)
*   [Command line](#command-line)
    *   [Default](#default)
    *   [Run](#run)
    *   [List](#list)
*   [Advanced](#advanced)
*   [Contributors](#contributors)
*   [License](#license)

## Installation

Install with yarn

```sh
yarn add better-scripts -D
```

Or install with npm

```sh
npm install better-scripts --save-dev
```

Or install with pnpm

```sh
pnpm add better-scripts -D
```

Or use npx for one-time use

```sh
npx better-scripts
```

## Usage

### Basic setup

Simply run `npx better-scripts` will read your existing scripts, let's give it a try at first

```sh
npx better-scripts
```

<p align="center">
  <img src="./static/example-at-first.png" alt="example-at-first" width="400px">
</p>

Now, let's move all `scripts` into `better-scripts` and add only one `"scripts": "better-scripts"` in `scripts`

```json
{
  "scripts": {
    "scripts": "better-scripts"
  },
  "better-scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
```

Then run `yarn scripts` will read your scripts from `better-scripts`

```sh
yarn scripts
```

### Add script description

Second value as description in array form

```json
{
  "better-scripts": {
    "dev": ["react-scripts start", "Start a development server"]
  }
}
```

<p align="center">
  <img src="./static/example-yarn.png" alt="example-at-first" width="400px">
</p>

### Script as object

You can add more properties in object form

```json
{
  "better-scripts": {
    "dev": {
      "alias": "🧑🏻‍💻 Dev",
      "command": "react-scripts start",
      "desc": "Start a development server"
    }
  }
}
```

<p align="center">
  <img src="./static/example-alias.png" alt="example-at-first" width="400px">
</p>

### Separate configuration file

You can write your "better-scriprts" out of `package.json`

Create a `scripts.json` file in the root directory

```json
{
  "dev": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test"
}
```

Supported file formats

*   a `better-scripts` property in package.json  (⭐️ Recommended)
*   `scripts.json`  (⭐️⭐️ Recommended)
*   `better-scripts.json`
*   `.better-scriptsrc`
*   `.better-scriptsrc.json`
*   `.better-scriptsrc.yaml`
*   `.better-scriptsrc.yml`
*   `.better-scriptsrc.js`
*   `.better-scriptsrc.cjs`
*   `better-scriptsrc.config.js`
*   `better-scriptsrc.config.cjs`

### Specified configuration file

```sh
yarn scripts --config custom-config.json
```

## Command line

```sh
yarn scripts --help

➤_ A better way to organize your npm scripts

Commands:
  better-scripts              Run your script  [default]
  better-scripts run <name>   Run script non-interactive, usually in CI mode
  better-scripts list [name]  Show all scripts

Options:
  -v, --version  Show version number  [boolean]
  -c, --config   Specified config filepath  [string]
      --track    Show tracked error stack message
  -h, --help     Show help  [boolean]

Examples:
  npx better-scripts                   - Run your script interactive
  npx better-scripts run dev           - Run "dev" script non-interactive
  npx better-scripts run build.deploy  - Run "build" and "deploy" child script in chain order
  npx better-scripts list              - Show all scripts
```

### Default

Interactive with one simple command

```sh
yarn scripts
```

### Run

Non-interactive with specific command

```sh
yarn scripts run <name>
```

> `<name>` is your script name that defined in config

Chain operation

```sh
yarn scripts run <name.name...>
```

Skip chaining paths

```sh
yarn scripts run <name.name...> --skip
```

> \-s, --skip

### List

Show all your scripts

```sh
yarn scripts list
```

Compact mode

```sh
yarn scripts list --compact
```

Show specific script name's scripts

```sh
yarn scripts list <name>
```

```sh
yarn scripts list <name.name...>
```

## Advanced

The API is not stable yet

## Contributors

|                                             iamyoki                                             |                                           annoyc                                           |
| :---------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------: |
| [![iamyoki](./static/contributors/iamyoki.svg "iamyoki")](https://github.com/iamyoki "iamyoki") | [![annoyc](./static/contributors/annoyc.svg "annoyc")](https://github.com/annoyc "annoyc") |

## License

[MIT](https://choosealicense.com/licenses/mit/)
