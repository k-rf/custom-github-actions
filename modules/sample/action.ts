import * as core from "@actions/core";

import { Action } from "./action.meta";

const run = (): void => {
  const args = new Action();

  console.log(args);

  try {
    core.info("Hello Actions");
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

run();
