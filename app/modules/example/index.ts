import * as core from "@actions/core";

const run = (): void => {
  try {
    core.info("Hello World");
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

run();
