import { Prettify } from "@k-rf/types";

import { ActFnReturnObj, Act } from "./act";
import { ActionMeta, InputMeta, InputType } from "./action";

/** アクションのメタ情報の定義 */
export type DefineAction = {
  actionMeta: DefineActionFn;
};
type DefineActionFn = (actionMeta: ActionMeta) => {
  // TODO: 引数なしパターンに対応する
  inputs: DefineInput;
};

/** 入力のメタ情報の定義 */
type DefineInput = <T extends ActFnReturnObj<InputType>>(
  createInput: DefineInputFn<T>
) => { parse: ParseMetaFn<T> };
type DefineInputFn<T extends ActFnReturnObj<InputType>> = (a: Act) => T;

/** メタ情報をパースする */
export type ParseMetaFn<T extends ActFnReturnObj<InputType>> =
  () => ParseMetaFnReturn<T>;
export type ParseMetaFnReturn<T extends ActFnReturnObj<InputType>> = {
  inputs: ParsedInput<T>;
  meta: {
    action: ActionMeta;
    inputs: InputMeta[];
  };
};

/** パースされた入力値 */
export type ParsedInput<T extends ActFnReturnObj<InputType>> = Prettify<{
  [K in keyof T]: ReturnType<ReturnType<T[K]["parse"]>["getInput"]>;
}>;

export type ParsedActionMeta = ParseMetaFnReturn<ActFnReturnObj<InputType>>;
