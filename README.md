# GitHub Actions -- カスタムアクション開発環境

このプロジェクトは、GitHub Actions のカスタムアクションを TypeScript で開発するための開発環境を提供するものです。

## はじめに

必要なパッケージをインストールする。

```sh
pnpm install
```

## モジュールを追加する

ガイドにしたがって情報を入力する。  
モジュールが作成される際、パッケージのインストールも実行される。

```sh
pnpm scaffold
```

## ビルドする

```sh
pnpm build        # すべて
pnpm build:ab     # action-builder のみ
pnpm build:action # カスタムアクションのみ
```
