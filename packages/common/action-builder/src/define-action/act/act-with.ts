import { InputType } from "../types";

import { actDefault } from "./act-default";
import { actOptional } from "./act-optional";
import { actParse } from "./act-parse";

export const actWith =
  <T extends InputType>(parser: {
    required: (key: string) => T;
    optional?: (key: string) => T | undefined;
  }) =>
  (description: string) => ({
    default: actDefault<T>({ description, getInput: parser.required }),
    optional: actOptional<T>({
      description,
      getInput: parser.optional ?? parser.required,
    }),
    parse: actParse<T>({
      description,
      required: true,
      getInput: parser.required,
    }),
  });
