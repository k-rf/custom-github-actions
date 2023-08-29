/**
 * 入力の定義に利用するヘルパー
 */

import { InputMeta, InputType } from "./action";

export type Act = {
  string: ActStringFn;
  number: ActNumberFn;
  boolean: ActBooleanFn;
};

export type ActStringFn = (description: string) => ActFnReturnType<string>;
export type ActNumberFn = (description: string) => ActFnReturnType<number>;
export type ActBooleanFn = (description: string) => ActFnReturnType<boolean>;

/** ActXxxFn 関数が返す型 */
type ActFnReturnType<T extends InputType> = ActParse<T> &
  ActOptional<T> &
  ActDefault<T>;

/** パースの設定をする */
export type ActParse<T extends InputType> = {
  parse: ActParseFn<T>;
};
type ActParseFn<T extends InputType> = (key: string) => ActParseFnReturn<T>;
type ActParseFnReturn<T extends InputType> = {
  getInput: () => T;
} & InputMeta;

/** オプションの設定をする */
export type ActOptional<T extends InputType> = {
  optional: () => ActParse<T | undefined>;
};

/** デフォルト値の設定をする */
export type ActDefault<T extends InputType> = {
  default: (value: T) => ActParse<T>;
};

/**
 * Act の関数が返す型のオブジェクト
 */
export type ActFnReturnObj<T extends InputType> = Record<
  string,
  ActFnReturn<T>
>;
type ActFnReturn<T extends InputType> =
  | (ActParse<T> & ActOptional<T>)
  | (ActParse<T> & ActDefault<T>)
  | ActParse<T>;
