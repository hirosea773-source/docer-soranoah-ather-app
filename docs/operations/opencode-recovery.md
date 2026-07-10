# OpenCode復旧メモ

## 発生日

2026-07-10

## 状況

Docker停止後、Dev Container内の `opencode` が起動できなくなった。

## 原因

`/usr/local/share/npm-global/lib/node_modules/opencode-ai/bin/opencode.exe` が 0バイトになっていた。

## 対応

- `npm cache verify`
- `npm install -g opencode-ai`
- `which opencode`
- `opencode --version`

## 注意

`docker system prune -a`、`docker volume prune`、`docker compose down -v` は不用意に実行しない。
