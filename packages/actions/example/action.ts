import * as core from "@actions/core";
import { zip, values } from "remeda";

import { action } from "./action.meta";

const run = (): void => {
  try {
    core.info(
      zip(action.meta.inputs, values(action.inputs))
        .map(([meta, input]) => {
          return `${meta.name}: {${[
            `required: ${meta.required}`,
            `default: ${meta.default}`,
            `input: '${input}'`,
            `type: ${typeof input}`,
          ].join(", ")}}`;
        })
        .join("\n")
    );
  } catch (err) {
    if (err instanceof Error) core.setFailed(err.message);
  }
};

run();
