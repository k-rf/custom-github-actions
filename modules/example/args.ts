import { Arg, BaseArgs } from "@k-rf/action-builder/core";

export class Args extends BaseArgs<Args> {
  @Arg({ description: "名前", defaultValue: "John" })
  readonly name: string;

  @Arg({ description: "年齢", defaultValue: 42 })
  readonly age: number;

  constructor() {
    super();

    this.name = this.getInput("name");
    this.age = this.getInput("age");
  }
}
