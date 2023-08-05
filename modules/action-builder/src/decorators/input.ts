import { Primitive } from "@k-rf/types";

import { metadata } from "../core";

type InputProps = { description: string; defaultValue?: Primitive };

export const Input = ({ description, defaultValue }: InputProps) => {
  return <T>(_target: T, fieldName: string) => {
    metadata.inputs = (metadata.inputs ?? []).concat({
      inputName: fieldName,
      inputDescription: description,
      inputDefault: defaultValue,
    });
  };
};
