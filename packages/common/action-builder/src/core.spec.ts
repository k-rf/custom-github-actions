import * as core from "@actions/core";

import { objectEntries } from "./utils";

import { defineAction } from ".";

const fixture = {
  id: "123",
  name: "John Doe",
  age: 42,
  height: 192.1,
  isMember: false,
  isPremium: true,
  // TODO: date: new Date("2023-01-01T09:00:00"),
};

const action = defineAction
  .actionMeta({
    name: "Test Action",
    description: "Test Action Description",
  })
  .inputs((a) => ({
    id: a.string("id"),
    name: a.string("name"),
    age: a.number("age"),
    height: a.number("height"),
    isMember: a.boolean("isMember"),
    isPremium: a.boolean("isPremium"),
    // TODO: date: a.date("date")
  }));

describe("core", () => {
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
    const sut = action.parse();

    it.each(objectEntries(fixture))("%s: %s", (key, value) => {
      expect(sut.inputs[key]).toStrictEqual(value);
    });
  });
});
