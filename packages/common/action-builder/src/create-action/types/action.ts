/** アクションのメタ情報 */
export type ActionMeta = {
  name: string;
  description: string;
};

/** 入力のメタ情報 */
export type InputMeta = {
  name: string;
  description: string;
  required?: boolean;
  default?: InputType;
};

/** 入力として利用できる型 */
export type InputType =
  | boolean
  | number
  | string
  // TODO: | Date
  | undefined;
