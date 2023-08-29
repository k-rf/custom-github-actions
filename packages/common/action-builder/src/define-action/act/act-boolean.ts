import * as core from "@actions/core";

import { actWith } from "./act-with";

export const actBoolean = actWith({
  required: (key) => core.getInput(key).toLocaleLowerCase() === "true",
});
