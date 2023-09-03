import { InputType, ActDefault } from "../types";

import { actParse } from "./act-parse";

export const actDefault =
  <T extends InputType>({
    description,
    getInput,
  }: {
    description: string;
    getInput: (key: string) => T;
  }): ActDefault<T>["default"] =>
  (defaultValue) => ({
    parse: actParse({ description, defaultValue, getInput }),
  });
