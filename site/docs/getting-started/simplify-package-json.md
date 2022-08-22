# ✂️ Simplify package.json

## Remove previous scripts

Since we add a configuration in `scripts.json`, we don't need to maintain npm scripts in two places.

Now let's remove previous.

```json title="package.json"
{
  "scripts": {
    "scripts": "better-scripts",
    # highlight-start
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test"
    # highlight-end
  }
}
```

## Edit config command

Now command `yarn xxx` in config won't work, so we need change it to real command.

```json title="scripts.json"
{
  "dev": {
    "alias": "🌟 Dev",
    # highlight-next-line
    "command": "react-scripts start",
    "desc": "Start a development server"
  },
  "build": {
    "alias": "📦 Build",
    # highlight-next-line
    "command": "react-scripts build",
    "desc": "Create a production build"
  },
  "test": {
    "alias": "🧪 Test",
    # highlight-next-line
    "command": "react-scripts test",
    "desc": "Run tests"
  }
}
```

## Final

<img src="/example-simplified.png" width="400" />
<span>&nbsp;&nbsp;</span>
<img src="/example-separate-final.png" width="330"/>

🎉 Great! Your package.json will always be clean and tidy.
