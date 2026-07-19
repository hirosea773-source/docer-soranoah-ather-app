This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Development

UIはNext.js 16で開発し、Vercel Previewで確認します。最終成果物はStatic Exportし、`out/`をXserverへ配置します。

本番の動的処理にはPHP 8.3、データベースにはMariaDBを使用します。YouTube Data APIはXserver Cronから実行し、通常ページアクセス時はMariaDBへ保存済みのデータだけをPHP APIから取得します。

```bash
npm ci
npm run dev
```

### Verification

```bash
npm run check:env
npm run typecheck
npm run lint
npm run build
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

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
