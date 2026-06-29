import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// 環境変数からデータベースURLを取得
let databaseUrl = process.env.DATABASE_URL;

// DATABASE_URLが設定されているか確認
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL が設定されていません。環境変数を確認してください。",
  );
}

// Dockerコンテナ間通信でホスト名解決ができない場合、接続先をコンテナ名にフォールバックする
if (databaseUrl.includes("host.docker.internal")) {
  databaseUrl = databaseUrl
    .replace("host.docker.internal", "supabase_db_soranoah-authr-app")
    .replace(":54322", ":5432");
}

// データベースプールを初期化
const pool = new Pool({
  connectionString: databaseUrl,
});

export const db = drizzle(pool);
