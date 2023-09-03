import { defineAction } from "@k-rf/action-builder";

export const action = defineAction
  .actionMeta({
    name: "Sample (meta)",
    description: "Sample description (meta)",
  })
  .inputs((a) => ({
    name: a.string("名前").default("John"),
    age: a.number("年齢").default(42),
  }))
  .parse();
