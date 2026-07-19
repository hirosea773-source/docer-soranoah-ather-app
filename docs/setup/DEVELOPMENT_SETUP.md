# Development Setup

## 目的

このドキュメントは、開発環境の起動・確認・テスト・AI開発補助ツールの使い方をまとめる。

## 前提

- VS Code Dev Container で作業する
- Node.js 22 を使用する
- Next.js 16 でUIを開発し、Vercel Previewで確認する
- Static Exportした `out/` をXserverへ配置する
- 本番の動的処理はPHP 8.3、データベースはMariaDBを使用する
- YouTube Data APIはXserver Cronから実行し、通常ページアクセス時には呼び出さない
- Playwright でUI表示テストを実行する
- Codex・Clineによるcommitは行わない

## 初回セットアップ

```bash
npm ci
```
