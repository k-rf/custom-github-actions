import * as core from "@actions/core";

import { Action } from "./action.meta";

const run = (): void => {
  const args = new Action();

  try {
    core.info(`I am ${args.name}, I am ${args.age} years old.`);
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

run();
