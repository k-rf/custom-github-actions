import * as fs from "node:fs/promises";
import * as path from "path";

import { store } from "./core";
import { TemplateProps, template } from "./template";

export const generate = async (Args?: { new (): void } | undefined) => {
  if (Args) new Args();

  const pack = await fs
    .readFile(path.resolve(process.cwd(), "package.json"), {
      encoding: "utf-8",
    })
    .then((res) => JSON.parse(res));
  const inputs: TemplateProps["inputs"] = store.map((e) => {
    return {
      name: e.argName,
      description: e.description,
      default: String(e.defaultValue),
      required: !Boolean(e.defaultValue),
    };
  });

  await fs.writeFile(
    "./action.yaml",
    template({
      name: pack.name,
      description: pack.description,
      inputs,
    }).concat("\n"),
    { encoding: "utf-8" }
  );
};
