import * as core from "@actions/core";

export class ActionCoreHelper<Obj extends Record<string, unknown>> {
  getInput<K extends keyof Obj>(key: K): Obj[K] {
    return core.getInput(key as string) as Obj[K];
  }
}
