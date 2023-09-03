/**
 * ホバーしたとき、プロパティを読みやすく表示する。
 *
 * REF: https://www.totaltypescript.com/concepts/the-prettify-helper
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & unknown;

/**
 *  オプショナルな型に変換する
 *
 * NOTE: `exactOptionalPropertyTypes` を有効にし、 `Partial` の定義が変わったため。
 */
export type Optional<T> = {
  [K in keyof T]?: T[K] | undefined;
};

export type Primitive =
  | boolean
  | number
  | string
  | undefined
  | null
  | symbol
  | bigint;

/** 属性のキーのみを返す */
type OnlyProperty<T, K extends keyof T> = T[K] extends CallableFunction
  ? never
  : K extends "type"
  ? never
  : K;

/** 属性のみを返す */
export type Property<T> = {
  [K in keyof T as OnlyProperty<T, K>]: T[K];
};

/** キーを取得できるかどうかを判定する */
export type IsEmpty<T> = keyof {
  [K in keyof T as OnlyProperty<T, K>]: unknown;
} extends never
  ? true
  : false;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = T | U extends object
  ? (Without<T, U> & U) | (Without<U, T> & T)
  : T | U;
