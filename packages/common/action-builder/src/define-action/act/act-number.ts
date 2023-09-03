import * as core from "@actions/core";

import { actWith } from "./act-with";

export const actNumber = actWith({
  required: (key) => {
    return Number(core.getInput(key, { required: true }));
  },
  optional: (key) => {
    const input = core.getInput(key);
    return input ? Number(input) : undefined;
  },
});
