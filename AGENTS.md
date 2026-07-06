# AGENTS.md

## OpenCode Rules

- デフォルトはレビューのみ
- ファイル変更前に確認を取る
- 読み取り専用を優先する
- 差分のみ出力する
- 長大なコード全文を出力しない

## Stack

- Next.js App Router
- TypeScript
- Supabase SSR
- Playwright
- Drizzle ORM
- Tailwind CSS
- WSL2 + DevContainer + Docker Desktop

---

## Language Rules

- ユーザーへの説明は日本語で行う
- コメントは日本語で記述する
- チャット応答は日本語で行う
- エラー解析も日本語で説明する
- commit message は英語でOK
- コード識別子は英語を維持する

---

## Development Rules

- App Router only
- Pages Router を使用しない
- @supabase/ssr を使用する
- deprecated auth-helpers を使用しない
- middleware.ts を維持する
- server/client component を適切に分離する
- async/await を使用する
- 必要ない dependency を追加しない
- 既存folder構成を維持する
- Playwright test を壊さない

---

## API Usage Rules

### 目的

API無料枠の範囲内で、
最小限のAPIリクエスト回数でタスクを遂行する。

### API呼び出し最小化

- 可能な限り1回のプロンプトとレスポンスで完了する
- 自律的な連続API呼び出しは禁止
- 自動ループは禁止
- 不要なautocomplete的補完を避ける

### トークン最適化

- 必要なファイルのみ参照する
- 長大なコード全文出力を避ける
- 差分ベースで修正する
- 小さいfocused diffを優先する

---

## Output Rules

- 挨拶を省略する
- 冗長な説明を避ける
- 必要な結果のみ出力する
- 修正理由を日本語で説明する
- 変更ファイルを明示する
- 実行コマンドを明示する
- 無関係ファイルを変更しない

---

## Error Handling

- 推測でコードを書かない
- エラーになりそうな場合はユーザーへ確認する
- context不足時は質問する
- APIで勝手に検証しない
- 大規模変更前に確認する

---

## Workflow Rules

- 1ステップずつ進める
- 小さい変更を優先する
- 修正後は変更内容を要約する
- 一括リファクタリングを避ける

---

## Testing

修正後は必要最小限の確認のみ行う：

- npm run lint
- npm run typecheck
- 必要時のみ npx playwright test

---

## Forbidden

- package version を勝手に変更しない
- 無関係ファイルを変更しない
- 大規模リファクタリングをしない
- deprecated構成へ戻さない
- 自律的に複数回APIを実行しない

## ファイル作成ルール

新規ファイル作成前に必ず確認すること。

以下は禁止。

- 回答文をファイル名として作成
- 説明文をファイル名として作成
- 指示されていない新規ファイル作成

新規ファイル作成時は必ず以下を提示する。

### 作成理由

### ファイルパス

### 作成内容

承認後のみ作成すること

---

## AIエージェント禁止操作ルール

以下の操作はAIエージェントによる実行を厳禁とします：
- `docker compose down -v`
- `docker volume rm`
- `.env` の値の表示および勝手な編集
- 本番サーバー直接操作
- Xserver直接アップロード
- 勝手な `git commit`（必ず人間の確認・指示を挟む）
- 大規模な一括リファクタリング
- セキュリティ設定の推測追加
- 常時運用前提のルール追加
