This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Development

### Dev Container再構築後の確認手順

Dev Containerを再構築（Rebuild Container）後、以下の手順で動作確認を行ってください。

1. **`host.docker.internal` の解決確認**:
   Dev Containerのターミナルで以下のコマンドを実行し、`host.docker.internal`がホストのIPアドレスに解決されることを確認します。
   ```bash
   ping host.docker.internal
   ```
   または
   ```bash
   getent hosts host.docker.internal
   ```

2. **Supabase URLの設定確認**:
   `playwright.config.ts` で設定した `NEXT_PUBLIC_SUPABASE_URL` が正しく `http://host.docker.internal:54321` を指していることを確認します。Playwrightテストを実行する際に、このURLが使用されます。

3. **アプリケーションの起動と動作確認**:
   アプリケーションを起動し、Supabaseとの連携（例: ログイン、Todoリストの操作）が正常に機能することを確認します。
   ```bash
   npm run dev
   ```

4. **Playwrightテストの実行**:
   Playwrightテストを実行し、エラーなく完了することを確認します。これにより、PlaywrightがSupabaseのURLに正しく接続できるかを確認できます。
   ```bash
   npx playwright test
   ```

### Getting Started

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

