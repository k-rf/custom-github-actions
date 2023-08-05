import { Property, Primitive } from "@k-rf/types";

import { ActionCoreHelper } from "./libs";

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
    inputDefault?: Primitive;
  }[];
} = {};

export class Meta<Obj> {
  private readonly coreHelper = new ActionCoreHelper<Property<Obj>>();

  protected getInput<K extends keyof Property<Obj>>(key: K): Obj[K] {
    // TODO: すべて文字列で受け取るので、適切な値に変換する
    return this.coreHelper.getInput(key);
  }
}
