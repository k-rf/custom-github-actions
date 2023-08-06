import { ActionMeta, Input, Meta } from "@k-rf/action-builder";

@ActionMeta({
  name: "Example (meta)",
  description: "Example description (meta)",
})
export class Action extends Meta<Action> {
  @Input({ description: "名前", defaultValue: "John" })
  readonly name: string;

  @Input({ description: "年齢", defaultValue: 42, parser: "number" })
  readonly age: number;

  constructor() {
    super();

    this.name = this.getInput("name");
    this.age = this.getInput("age");
  }
}
