---
name: "module"
root: "./modules"
output: "."
ignore: ["modules"]
questions:
  module: "Please enter module name."
  name: "Please enter action name."
  description: "Please enter action description."
---

# `{{ inputs.module | snake }}/action.meta.ts`

```ts
import { ActionMeta, Input, Meta } from "@k-rf/action-builder";

@ActionMeta({
  name: "{{ inputs.name }}",
  description: "{{ inputs.description }}",
})
export class Action extends Meta<Action> {
  // Please define properties.
  @Input({ description: "Example" })
  readonly example: string;

  constructor() {
    super();

    this.example = this.getInput("example");
  }
}
```

# `{{ inputs.module | snake }}/action.ts`

```ts
import * as core from "@actions/core";

const run = (): void => {
  try {
    core.info("Hello {{ inputs.module }}");
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

run();
```

# `{{ inputs.module | snake }}/generate.ts`

```ts
/****************************
 * DO NOT MODIFY THIS FILE! *
 ****************************/

import { generate } from "@k-rf/action-builder";

import { Action } from "./action.meta";

generate(Action);
```

# `{{ inputs.module | snake }}/package.json`

```json
{
  "name": "{{ inputs.module | snake }}",
  "version": "1.0.0",
  "license": "MIT",
  "private": true,
  "scripts": {
    "clean": "rimraf dist",
    "build": "npm-run-all -s build:action build:yaml",
    "build:action": "pnpm clean && ncc build action.ts -o dist",
    "build:yaml": "ts-node-esm ./generate.ts"
  },
  "devDependencies": {
    "@k-rf/action-builder": "workspace:*",
    "@k-rf/types": "workspace:*"
  }
}
```
