import * as core from "@actions/core";
import { Property, Primitive } from "@k-rf/types";

export type TemplateProps = {
  name: string;
  description: string;
  inputs?: {
    name: string;
    description: string;
    required?: boolean;
    default?: string;
  }[];
  filename?: string;
};

export type ActionMetaProps = { name: string; description: string };

export const metadata: {
  meta?: ActionMetaProps;
  inputs?: {
    inputName: string;
    inputDescription: string;
    inputOptional?: boolean;
    inputDefault?: Primitive;
    inputParser?: (value: string) => unknown;
  }[];
} = {};

export class Meta<Obj> {
  protected getInput<K extends keyof Property<Obj>>(key: K): Obj[K] {
    const input = core.getInput(key as string);

    const parser = metadata.inputs?.find((e) => e.inputName === key)
      ?.inputParser;

    return (parser ? parser(input) : input) as Obj[K];
  }
}
