import { defineAction } from "@k-rf/action-builder";

export const action = defineAction
  .actionMeta({
    name: "Example (meta)",
    description: "Example description (meta)",
  })
  .inputMeta((a) => ({
    name: a.string("名前"),
    bio: a.string("伝記").optional(),
    country: a.string("国").default("日本"),
    age: a.number("年齢"),
    budget: a.number("予算").optional(),
    level: a.number("レベル").default(42),
    membership: a.boolean("メンバー"),
    premium: a.boolean("プレミアム").optional(),
    light: a.boolean("明るい").default(true),
    bright: a.boolean("鮮やか").default(false),
  }));
