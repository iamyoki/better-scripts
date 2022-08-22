---
sidebar_position: 2
---

# Installation

:::tip
The following instruction will use `yarn` as default pacakge manager, you can use `npm` or `pnpm` instead.
:::

## Install locally

`better-scripts` is recommend to be installed as a **dev** dependency.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="yarn" label="Yarn" default>

  ```shell
  yarn add better-scripts -D
  ```

  </TabItem>

  <TabItem value="npm" label="Npm">

  ```shell
  npm install better-scripts --save-dev
  ```

  </TabItem>

  <TabItem value="pnpm" label="Pnpm">

  ```shell
  pnpm add better-scripts -D
  ```

  </TabItem>
</Tabs>

## Install globally

<Tabs>
  <TabItem value="yarn" label="Yarn" default>

  ```shell
  yarn global add better-scripts
  ```

  </TabItem>

  <TabItem value="npm" label="Npm">

  ```shell
  npm install better-scripts -g
  ```

  </TabItem>

  <TabItem value="pnpm" label="Pnpm">

  ```shell
  pnpm global add better-scripts
  ```

  </TabItem>
</Tabs>

## Add a simplified script in `package.json`

```json title="package.json"
{
  "scripts": {
    ...
    "scripts": "better-scripts"
  }
}
```

## Run

```shell
yarn scripts
```
