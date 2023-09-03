import * as core from "@actions/core";

import { actWith } from "./act-with";

export const actString = actWith({
  required: (key) => core.getInput(key, { required: true }),
  optional: (key) => {
    const input = core.getInput(key);
    // TODO: これは `undefined` という文字を受け取れなくなる気がする
    // 受け取れるようにする必要があるのか微妙だが…
    return input === "undefined" ? undefined : input;
  },
});
