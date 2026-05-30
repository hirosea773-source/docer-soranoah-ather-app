import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// 環境変数からデータベースURLを取得
const databaseUrl = process.env.DATABASE_URL;

// DATABASE_URLが設定されているか確認
if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL が設定されていません。環境変数を確認してください。",
  );
}

// データベースプールを初期化
const pool = new Pool({
  connectionString: databaseUrl,
});

export const db = drizzle(pool);
