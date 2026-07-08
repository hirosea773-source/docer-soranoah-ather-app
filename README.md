This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Development

### Dev Container再構築後の確認手順

Dev Containerを再構築（Rebuild Container）後、以下の手順で動作確認を行います。

1. **依存関係の確認**
   プロジェクトの依存関係をインストールします。

   ```bash
   npm ci
   ```

2. **ローカルSupabaseの起動**
   Supabase CLIを使用してローカル環境を起動します。この際、Playwright E2Eテストは `http://127.0.0.1:54321` を使用し、`DATABASE_URL` は `postgresql://postgres:postgres@127.0.0.1:54322/postgres` となります。

   ```bash
   npx supabase start
   ```

3. **マイグレーションの実行**
   データベーススキーマを最新の状態に更新します。

   ```bash
   npx supabase db push
   ```

4. **E2Eテストの実行**
   認証 (`tests/auth.spec.ts`) とTodo CRUD (`tests/todo-crud.spec.ts`) のE2Eテストを実行します。`NEXT_PUBLIC_SUPABASE_ANON_KEY` は、GitHub Actions内で起動したローカルSupabaseから取得されるため、GitHub Secretsに本番SupabaseのURLやキーを登録する必要はありません。

   ```bash
   npx playwright test
   ```

5. **アプリケーションの起動（任意）**
   必要に応じてアプリケーションを起動し、手動での動作確認を行います。
   ```bash
   npm run dev
   ```

### Getting Started

### 環境変数チェック

本番デプロイ前に `npm run check:env` コマンドで、以下の必須環境変数が設定されているかを確認できます。

*   `NEXT_PUBLIC_SUPABASE_URL`
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
*   `DATABASE_URL`

`DATABASE_URL` はデータベース接続情報を含む秘密情報であるため、Git管理はしないでください。本番環境でのデプロイ時は、Vercel Environment Variables にこれら環境変数の実値を設定してください。

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## AIサーバー運用 (ローカルLLM環境)

当プロジェクトではAIサーバー（Ollama、Open WebUI等）は開発時のみ起動する前提とし、常時監視や24時間監視は前提にしません。

### 起動手順

```bash
sudo systemctl start ollama
docker start open-webui qdrant n8n
```

### 停止手順

```bash
docker stop open-webui qdrant n8n
sudo systemctl stop ollama
```

### 状態確認

```bash
systemctl status ollama --no-pager
docker ps
ollama list
```

### 障害時の復旧メモ

- もし Ollama の起動に失敗する場合、システムデーモン設定 `/lib/systemd/system/ollama.service` または環境変数 `HSA_OVERRIDE_GFX_VERSION` を確認し、`sudo systemctl daemon-reload` の上でリスタートしてください。
