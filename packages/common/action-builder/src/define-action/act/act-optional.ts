import { InputType, ActOptional } from "../types";

import { actParse } from "./act-parse";

export const actOptional =
  <T extends InputType>({
    description,
    getInput,
  }: {
    description: string;
    getInput: (key: string) => T | undefined;
  }): ActOptional<T>["optional"] =>
  () => ({ parse: actParse({ description, getInput }) });
