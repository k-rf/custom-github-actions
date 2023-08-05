import * as core from "@actions/core";

import { Args } from "./args";

const run = (): void => {
  const args = new Args();

  try {
    core.info(`I am ${args.name}, I am ${args.age} years old.`);
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

run();
