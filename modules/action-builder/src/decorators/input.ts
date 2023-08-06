import { Primitive } from "@k-rf/types";
import { P, match } from "ts-pattern";

import { metadata } from "../core";

type InputProps = {
  description: string;
  defaultValue?: Primitive;
  parser?: "boolean" | "number" | "string" | ((value: string) => unknown);
};

export const Input = ({ description, defaultValue, parser }: InputProps) => {
  return <T>(_target: T, fieldName: string) => {
    const inputParser = match(parser)
      .with(
        "boolean",
        () => (value: string) => value.toLocaleLowerCase() === "true"
      )
      .with("number", () => Number)
      .with("string", () => String)
      .with(P.nullish, () => undefined)
      .otherwise((parser) => parser);

    metadata.inputs = (metadata.inputs ?? []).concat({
      inputName: fieldName,
      inputDescription: description,
      inputDefault: defaultValue,
      ...(inputParser && { inputParser }),
    });
  };
};
