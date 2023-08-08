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

# `{{ inputs.package | snake }}/action.meta.ts`

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

# `{{ inputs.package | snake }}/action.ts`

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

# `{{ inputs.package | snake }}/generate.ts`

```ts
/****************************
 * DO NOT MODIFY THIS FILE! *
 ****************************/

import { generate } from "@k-rf/action-builder";

import { Action } from "./action.meta";

generate(Action);
```

# `{{ inputs.package | snake }}/package.json`

```json
{
  "name": "{{ inputs.package | snake }}",
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
