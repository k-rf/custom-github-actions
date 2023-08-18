import fs from "node:fs/promises";

import { Meta } from "./core";
import { ActionMeta, Input } from "./decorators";
import { generate } from "./generate";

@ActionMeta({ name: "Test Action", description: "Test Action Description" })
class TestAction extends Meta<TestAction> {
  @Input({ description: "name" })
  name: string;

  @Input({ description: "address", defaultValue: "Japan" })
  address: string;

  @Input({ description: "street", optional: true })
  street: string | undefined;

  constructor() {
    super();

    this.name = this.getInput("name");
    this.address = this.getInput("address");
    this.street = this.getInput("street");
  }
}

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
    await generate(TestAction);

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
