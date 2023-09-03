import fs from "node:fs/promises";

import { generate } from "./generate";

import { defineAction } from ".";

const testAction = defineAction
  .actionMeta({ name: "Test Action", description: "Test Action Description" })
  .inputMeta((a) => ({
    name: a.string("name"),
    address: a.string("address").default("Japan"),
    street: a.string("street").optional(),
  }));

describe("generate", () => {
  let output: { file: string; data: string };

  const spy = jest
    .spyOn(fs, "writeFile")
    .mockImplementation(async (file, data) => {
      output = {
        file: file.toString(),
        data: data.toString(),
      };
    });

  afterAll(() => {
    spy.mockRestore();
  });

  it("カスタムアクションのメタデータを YAML 形式で出力する", async () => {
    await generate(testAction);

    expect(output.file).toStrictEqual("./action.yaml");
    expect(output.data).toStrictEqual(
      [
        `#########################################################`,
        `# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY) #`,
        `#########################################################`,
        ``,
        `name: "Test Action"`,
        `description: "Test Action Description"`,
        `inputs:`,
        `  name:`,
        `    description: "name"`,
        `    required: true`,
        `  address:`,
        `    description: "address"`,
        `    default: "Japan"`,
        `  street:`,
        `    description: "street"`,
        `runs:`,
        `  using: "node16"`,
        `  main: "dist/index.js"`,
        ``,
      ].join("\n")
    );
  });
});
