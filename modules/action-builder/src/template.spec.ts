import { template } from "./template";

describe("template", () => {
  it("メタデータを作成する", () => {
    const actual = template({
      name: "template",
      description: "template description",
      inputs: [
        {
          name: "name",
          description: "name description",
          default: "John",
          required: true,
        },
        {
          name: "age",
          description: "age description",
        },
      ],
    });

    expect(actual).toStrictEqual(
      [
        `name: "template"`,
        `description: "template description"`,
        `inputs:`,
        `  name:`,
        `    description: "name description"`,
        `    required: true`,
        `    default: "John"`,
        `  age:`,
        `    description: "age description"`,
        `runs:`,
        `  using: "node16"`,
        `  main: "dist/index.js"`,
      ].join("\n")
    );
  });

  it("`inputs` が空配列の場合は `inputs:` ブロックは生成しない", () => {
    const actual = template({
      name: "template",
      description: "template description",
      inputs: [],
    });

    expect(actual).toStrictEqual(
      [
        `name: "template"`,
        `description: "template description"`,
        `runs:`,
        `  using: "node16"`,
        `  main: "dist/index.js"`,
      ].join("\n")
    );
  });

  it("`inputs` が存在しない場合は `inputs:` ブロックは生成しない", () => {
    const actual = template({
      name: "template",
      description: "template description",
    });

    expect(actual).toStrictEqual(
      [
        `name: "template"`,
        `description: "template description"`,
        `runs:`,
        `  using: "node16"`,
        `  main: "dist/index.js"`,
      ].join("\n")
    );
  });

  it("出力ファイル名を変更できる", () => {
    const actual = template({
      name: "template",
      description: "template description",
      filename: "action.js",
    });

    expect(actual).toStrictEqual(
      [
        `name: "template"`,
        `description: "template description"`,
        `runs:`,
        `  using: "node16"`,
        `  main: "dist/action.js"`,
      ].join("\n")
    );
  });
});
