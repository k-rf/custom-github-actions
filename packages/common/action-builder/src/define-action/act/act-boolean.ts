import * as core from "@actions/core";

import { actWith } from "./act-with";

export const actBoolean = actWith({
  required: (key) =>
    core.getInput(key, { required: true }).toLocaleLowerCase() === "true",
  optional: (key) => {
    const input = core.getInput(key);
    return input ? input.toLocaleLowerCase() === "true" : undefined;
  },
});
