import { TemplateProps } from "../core";

const TAB_WIDTH = 2;

/**
 * action.yaml のテンプレート
 */
export const template = ({
  name,
  description,
  inputs,
  filename = "index.js",
}: TemplateProps) => {
  const content = [
    `name: "${name}"`,
    `description: "${description}"`,
    createInputs(inputs, 1),
    `runs:`,
    `  using: "node16"`,
    `  main: "dist/${filename}"`,
  ]
    .filter(Boolean)
    .join("\n");

  return [
    `#########################################################`,
    `# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY) #`,
    `#########################################################`,
    ``,
    content,
    ``,
  ].join("\n");
};

/**
 * inputs を生成する
 */
const createInputs = (inputs: TemplateProps["inputs"], indentLevel: number) => {
  const options = (inputs ?? [])
    .map((input) => {
      return [
        `${" ".repeat(indentLevel * TAB_WIDTH)}${input.name}:`,
        createOptions(input, indentLevel + 1),
      ].join("\n");
    })
    .join("\n");

  if (options.length === 0) {
    return options;
  } else {
    return ["inputs:", `${options}`].join("\n");
  }
};

/**
 * inputs に与えるそれぞれの引数を生成する
 *
 * NOTE
 * -----------------------------------------------------------------------------
 *
 * `undefined` や `false` はキーとして与える必要がないため除外する。
 */
const createOptions = (
  arg: Required<TemplateProps>["inputs"][number],
  indentLevel: number
) => {
  return [
    { key: "description", value: `"${arg.description}"` },
    { key: "required", value: arg.required },
    { key: "default", value: arg.default ? `"${arg.default}"` : undefined },
  ]
    .filter((opt) => opt.value)
    .map((opt) => {
      return `${" ".repeat(indentLevel * TAB_WIDTH)}${opt.key}: ${opt.value}`;
    })
    .join("\n");
};
