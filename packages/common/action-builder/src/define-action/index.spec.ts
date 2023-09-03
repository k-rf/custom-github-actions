import * as core from "@actions/core";

import { objectEntries } from "../utils";

import { defineAction } from ".";

const fixture = {
  name: "John Doe",
  bio: undefined,
  country: "日本",
  age: 24,
  budget: undefined,
  level: 42,
  membership: true,
  premium: undefined,
  light: true,
  bright: false,
  // TODO: date: new Date("2023-01-01T09:00:00"),
};

const action = defineAction
  .actionMeta({
    name: "Test Action",
    description: "Test Action Description",
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
    // TODO: date: a.date("date")
  }));

describe("defineAction", () => {
  const spy = jest.spyOn(core, "getInput").mockImplementation((name) => {
    const target = objectEntries(fixture).find(([key]) => key === name)?.[1];

    // TODO:
    // return target instanceof Date
    //   ? target.toISOString()
    //   : target?.toString() ?? "";

    return target?.toString() ?? "";
  });

  afterAll(() => {
    spy.mockRestore();
  });

  describe("指定したキーの値を対応する型にパースした値を返す", () => {
    const sut = action;

    it.each(objectEntries(fixture))("%s: %s", (key, value) => {
      expect(sut.inputs[key]).toStrictEqual(value);
    });
  });
});
