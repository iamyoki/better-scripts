<br />
<h1 align="center">➤_ Begin Script</h1>

<br>
<p align="center"><strong>A User-friendly CLI to run any npm scripts with one command from "begin"</strong></p>
<br>

<p align="center">
  <img src="example.jpg" alt="logo" width="450px" />
</p>

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Installation

Install with yarn

```bash
yarn add begin-script -D
```

Or install with npm

```bash
npm install begin-script --save-dev
```

## Usage

Create a `.beginrc.json` file in root directory

```json
{
  "tasks": [
    ["🎉Intro", "echo \"Hello world!\"", "An example task"]
  ]
}
```

Run `npx begin-script` in root directory.

Or add a script in `package.json`

```json
scripts: {
  "begin": "begin-script",
  ...
}
```

Now run `yarn begin` is good to go.


## License

[MIT](https://choosealicense.com/licenses/mit/)