# ๐ Separate configuration

## Create a configuration

Creata a `scripts.json` file at the root of your project directory.

> [See all supported configuration file fomats](/)

```json title="scripts.json"
{
  "dev": {
    "alias": "๐ Dev",
    "command": "yarn start",
    "desc": "Start a development server"
  },
  "build": {
    "alias": "๐ฆ Build",
    "command": "yarn build",
    "desc": "Create a production build"
  },
  "test": {
    "alias": "๐งช Test",
    "command": "yarn test",
    "desc": "Run tests"
  }
}
```
