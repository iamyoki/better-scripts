# Configuration Proposal

Format support:

- a `begin` property in package.json
- `.beginrc`
- `.beginrc.json`
- `.beginrc.yaml`
- `.beginrc.yml`
- `.beginrc.js`
- `.beginrc.cjs`
- `beginrc.config.js`
- `beginrc.config.cjs`

## Task forms

Array form

> [script, description]

```json
{
  "tasks": [
    ["react-scripts start", "Start a development server"],
    ["react-scripts build", "Create a production build"],
    ["react-scripts test", "Run unit tests"],
    ["eslint src", "Lint source files"],
  ]
}
```

Array form with a nice name

> [name, script, description]

```json
{
  "tasks": [
    ["👨🏻‍💻 Dev", "react-scripts start", "Start a development server"],
    ["📦 Build", "react-scripts build", "Create a production build"],
    ["🧪 Test", "react-scripts test", "Run unit tests"],
    ["🔎 Lint", "eslint src", "Lint source files"],
  ]
}
```

Task as object

```json
{
  "tasks": [
    {
      "name": "👨🏻‍💻 Dev",
      "script": "react-scripts start",
      "desc": "Start a development server"
    },
    {
      "name": "📦 Build",
      "script": "react-scripts build",
      "desc": "Create a production build"
    },
    {
      "name": "🧪 Test",
      "script": "react-scripts test",
      "desc": "Run unit tests"
    },
    {"name": "🔎 Lint", "script": "eslint src", "desc": "Lint source files"}
  ]
}
```

Task as object as last position in array

> Notice: The same key defined in the object will overwrite the value of the corresponding array

```json
{
  "tasks": [
    [
      "react-scripts start",
      "Start a development server",
      {
        "name": "👨🏻‍💻 Dev"
      }
    ]
  ]
}
```

```json
{
  "tasks": [
    [
      "👨🏻‍💻 Dev",
      "react-scripts start",
      "Start a development server",
      {
        "env": {
          "PORT": 3300
        }
      }
    ]
  ]
}
```

## Child Tasks

```json
{
  "tasks": [
    {
      "name": "🧪 Tests",
      "desc": "Select a test suit to run",
      "tasks": [
        ["Components", "react-scripts test src/components", "Test UI components"],
        ["Pages", "react-scripts test src/pages", "Test Pages"]
      ]
    }
  ]
}
```

Run child tasks after parent script executed successfully

```json
{
  "tasks": [
    {
      "name": "🧪 Tests",
      "desc": "Select a test suit to run",
+     "script": "yarn begin lint",
      "tasks": [
        ["Components", "react-scripts test src/components", "Test UI components"],
        ["Pages", "react-scripts test src/pages", "Test Pages"]
      ]
    }
  ]
}
```

## Task environment variables

```json
{
  "tasks": [
    {
      "name": "👨🏻‍💻 Devs",
      "desc": "Select a dev mode",
      "tasks": [
        {
          "name": "Start Silently",
          "script": "react-scripts start",
          "env": {
            "BROWSER": "no"
          }
        },
        {
          "name": "Start on 3300",
          "script": "react-scripts start",
          "env": {
            "PORT": 3300
          }
        }
      ]
    }
  ]
}
```
