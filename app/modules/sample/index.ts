import * as core from "@actions/core";

const run = (): void => {
  try {
    core.info("Hello Actions");
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

run();
