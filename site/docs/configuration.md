---
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configuration

## Supported file formats

- a `better-scripts` property in package.json  (⭐️ Recommended)
- `scripts.json`  (⭐️⭐️ Recommended)

<details><summary>See more formats</summary>
<p>

  - `better-scripts.json`
  - `.better-scriptsrc`
  - `.better-scriptsrc.json`
  - `.better-scriptsrc.yaml`
  - `.better-scriptsrc.yml`
  - `.better-scriptsrc.js`
  - `.better-scriptsrc.cjs`
  - `better-scriptsrc.config.js`
  - `better-scriptsrc.config.cjs`

</p>
</details>


## Specification

<Tabs>
<TabItem value="string" label="String">

```json title="scripts.json"
{
  "dev": "react-scripts start"
}
```

> "`scriptName`": "`command`"

</TabItem>

<TabItem value="array" label="Array">

```json title="scripts.json"
{
  "dev": ["react-scripts start", "Start a development server"]
}
```

> "`scriptName`": ["`command`", "`desc`"]

</TabItem>

<TabItem value="object" label="Object" default>

```json title="scripts.json"
{
  "dev": {
    "alias": "🌟 Dev",
    "command": "react-scripts start",
    "desc": "Start a development server",
  }
}
```

### Config Object

| Property   | Type                                      | Description                    | Required |
| ---------- | ----------------------------------------- | ------------------------------ | -------- |
| scriptName | `Script`: string \| array       \| object | The key of the `Script` object | ✅        |

### Script Object

| Property                        | Type               | Description                                                                                  | Required |
| ------------------------------- | ------------------ | -------------------------------------------------------------------------------------------- | -------- |
| alias                           | string             | 🥳 Displayed name. Defaults to scriptName                                                     |          |
| command                         | string             | The key of the script object                                                                 |          |
| desc \| describe \| description | string             | Explain what this script does                                                                |          |
| scripts                         | `Config`: object   | Nested child scripts. Run step by step                                                       |          |
| prescript                       | `Config`: `Script` | Pre-runs. [Same as npm.](https://docs.npmjs.com/cli/v8/using-npm/scripts#pre--post-scripts)  |          |
| postscript                      | `Config`: `Script` | Post-runs. [Same as npm.](https://docs.npmjs.com/cli/v8/using-npm/scripts#pre--post-scripts) |          |
| env                             | `Env`: object      | Cross-platform environment virables                                               |          |

<details>
<summary>TS Interface</summary>

```ts
interface UserConfig {
  alias?: string;
  command?: string;
  desc?: string;
  description?: string;
  describe?: string;
  scripts?: UserConfig;
  prescript?: Valueof<UserConfig>;
  postscript?: Valueof<UserConfig>;
  env?: {
    [key: string]: string;
  };
}
```

</details>

</TabItem>
</Tabs>
