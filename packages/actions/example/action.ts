import * as core from "@actions/core";

import { action } from "./action.meta";

const run = (): void => {
  try {
    core.info("------ meta ------");
    core.info(
      Object.entries(action.meta.inputs)
        .map(
          ([key, value]) =>
            `${key}: { default: ${value.default}, required: ${value.required} }`
        )
        .join("\n")
    );
    core.info("------ inputs ------");
    core.info(
      Object.entries(action.inputs)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n")
    );
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

run();
