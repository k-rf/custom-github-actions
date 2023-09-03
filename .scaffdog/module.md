---
name: "package"
root: "./packages"
output: "."
ignore: ["packages"]
questions:
  package: "Please enter package name."
  name: "Please enter action name."
  description: "Please enter action description."
---

# `actions/{{ inputs.package | kebab }}/action.meta.ts`

```ts
import { defineAction } from "@k-rf/action-builder";

export const action = defineAction
  .actionMeta({
    name: "{{ inputs.name }}",
    description: "{{ inputs.description }}",
  })
  .inputs((a) => ({
    // ここに入力の属性を定義してください。
    sample: a.string("サンプル"),
  }))
  .parse();
```

# `actions/{{ inputs.package | kebab }}/action.ts`

```ts
import * as core from "@actions/core";

const run = (): void => {
  try {
    core.info("Hello {{ inputs.package }}");
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

run();
```

# `actions/{{ inputs.package | kebab }}/generate.ts`

```ts
/****************************
 * DO NOT MODIFY THIS FILE! *
 ****************************/

import { generate } from "@k-rf/action-builder";

import { action } from "./action.meta";

generate(action);
```

# `actions/{{ inputs.package | kebab }}/package.json`

```json
{
  "name": "{{ inputs.package | kebab }}",
  "version": "1.0.0",
  "license": "MIT",
  "private": true,
  "scripts": {
    "clean": "rimraf dist",
    "build": "npm-run-all -s build:action build:yaml",
    "build:action": "pnpm clean && ncc build action.ts -o dist",
    "build:yaml": "ts-node-esm ./generate.ts"
  },
  "dependencies": {},
  "devDependencies": {
    "@k-rf/action-builder": "workspace:*",
    "@k-rf/types": "workspace:*"
  }
}
```
