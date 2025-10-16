# Template Todo App

[English](./docs/lang/en.md) | 日本語

Next.js/Antd を使用した Todo アプリケーション

## 実装 UI

<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    <figure>
        <img src="./docs/images/ui-1.png" />
        <figcaption>タスク管理(/tasks)</figcaption>
    </figure>
    <figure>
        <img src="./docs/images/ui-2.png" />
        <figcaption>アカウント管理(/accounts)</figcaption>
    </figure>
    <figure>
        <img src="./docs/images/ui-3.png" />
        <figcaption>新規アカウント作成(/accounts/new)</figcaption>
    </figure>
</div>

## セットアップ手順

1. リポジトリのクローン

   ```bash
   git clone <repository-url>
   cd template-todo-app
   ```

2. 依存関係のインストール

   ```bash
   pnpm install
   ```

3. 仮想環境および DB のセットアップ

   ```bash
   # DockerでPostgreSQLを起動
   docker compose up -d

   # データベーススキーマの同期
   npx prisma db push

   # サンプルデータの投入
   pnpm db:seed
   ```

4. サーバーの起動

   ```bash
   pnpm dev
   ```

5. 動作確認
   - ブラウザで `http://localhost:3000` にアクセス
   - アカウント管理とタスク管理機能を確認
