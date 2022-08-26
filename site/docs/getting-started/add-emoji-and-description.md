# 🥳 Add emoji and description

<img src="/example-at-then-yarn.png" width="400" />

## Previous

Beforehand, we have npm scripts like this that need to add emoji and desc.

```json title="package.json"
{
  "scripts": {
    "scripts": "better-scripts",
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
  }
}
```

:::tip
By default, better-scripts reads the `scripts` field in `package.json` if config is not found, but now we need to add some config for emoji and description.
:::

## Add description

Add a `better-scripts` field in `pacakge.json` and write command and description

```json title="package.json"
{
  "scripts": {...},
  "better-scripts": {
    "start": ["react-scripts start", "Start a development server"],
    "build": ["react-scripts build", "Create a production build"],
    "test": ["react-scripts test", "Run tests"]
  }
}
```

> `scriptName`: [`command`, `desc`]

## Add emoji

An array formed script value can only place command and desc, we need change it to an object in order to add emoji.

```json title="package.json"
{
  "scripts": {...},
  "better-scripts": {
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
}
```
