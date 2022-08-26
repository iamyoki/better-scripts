# 📄 Separate configuration

## Create a configuration

Creata a `scripts.json` file at the root of your project directory.

> [See all supported configuration file fomats](/)

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
