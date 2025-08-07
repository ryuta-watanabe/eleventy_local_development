# eleventy_local_development

静的サイトジェネレーター「Eleventy (11ty)」を使ったローカル開発用プロジェクトです。

## 概要

- Node.js（v22系）とEleventyを利用した静的サイトの開発・ビルド環境
- ESLintによるコード品質チェック
- GitHub ActionsによるCI（lint/ビルド）

## セットアップ

### 1. Node.js 22.x をインストール

公式サイトからインストーラーをダウンロードするか、nodenv（Node.jsバージョン管理ツール）を使うのがおすすめです。

- [Node.js 公式サイト](https://nodejs.org/ja/download/)

#### nodenvを使う場合

```sh
# nodenvが未インストールの場合は https://github.com/nodenv/nodenv を参照
$ nodenv install 22.0.0
$ nodenv global 22.0.0
```

### 2. 依存パッケージのインストール

```sh
$ npm ci
```

### 3. 開発サーバ起動

```sh
$ npm run start
```

## ディレクトリ構成

```text
src/
  _data/         # サイト全体のデータ
  _includes/     # パーツテンプレート
  _layouts/      # レイアウトテンプレート
  images/        # 画像素材
  pages/         # ページ本体
  scripts/       # JSファイル
  styles/        # CSSファイル
```

## 主なコマンド

- Lint: `npm run lint`
- Build: `npm run build`

## CIについて

- すべての push/PR で lint を自動実行
- main ブランチへの PR 時のみビルド検証
- npm パッケージのキャッシュで高速化

## ライセンス

MIT

---

ご自由にカスタマイズ・コントリビュートしてください。
