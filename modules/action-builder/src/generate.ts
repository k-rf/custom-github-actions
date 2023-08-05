import * as fs from "node:fs/promises";

import { ActionMetaProps, metadata, TemplateProps } from "./core";
import { template } from "./templates";
import { throwError } from "./utils";

/**
 * メタデータの情報をもとに、action.yaml を生成する
 */
export const generate = async (Action?: { new (): unknown }) => {
  if (Action) new Action();

  const actionMeta = await getActionMeta();
  const inputs = getInputs();

  await createActionYaml(actionMeta, inputs);
};

/**
 * アクションのメタデータを取得する
 */
const getActionMeta = async (): Promise<ActionMetaProps> => {
  const { meta } = metadata;

  return {
    name: meta?.name ?? throwError("Action name is required."),
    description:
      meta?.description ?? throwError("Action description is required."),
  };
};

/**
 * アクションのインプットを取得する
 */
const getInputs = () =>
  metadata.inputs?.map((e) => {
    return {
      name: e.inputName,
      description: e.inputDescription,
      default: String(e.inputDefault),
      required: !Boolean(e.inputDefault),
    };
  });

/**
 * action.yaml を出力する
 */
const createActionYaml = async (
  actionMeta: ActionMetaProps,
  inputs: TemplateProps["inputs"]
) => {
  await fs.writeFile(
    "./action.yaml",
    template({
      name: actionMeta.name,
      description: actionMeta.description,
      ...(inputs && { inputs }),
    }).concat("\n"),
    { encoding: "utf-8" }
  );
};
