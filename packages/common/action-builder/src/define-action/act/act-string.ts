import * as core from "@actions/core";

import { actWith } from "./act-with";

export const actString = actWith({
  required: (key) => core.getInput(key, { required: true }),
  optional: (key) => {
    const input = core.getInput(key);
    return input || undefined;
  },
});
