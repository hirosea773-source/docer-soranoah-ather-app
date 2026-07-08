import fs from "node:fs";
import process from "node:process";

import dotenv from "dotenv";

const envFiles = [".env.local", ".env"];

for (const envFile of envFiles) {
  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
  }
}

const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "DATABASE_URL",
];

const missingEnvVars = requiredEnvVars.filter((key) => {
  const value = process.env[key];

  return typeof value !== "string" || value.trim() === "";
});

if (missingEnvVars.length > 0) {
  console.error("環境変数が不足しています:");
  for (const key of missingEnvVars) {
    console.error(`- ${key}`);
  }

  console.error("");
  console.error(
    ".env.local または実行環境の Environment Variables を確認してください。",
  );
  process.exit(1);
}

const databaseUrl = process.env.DATABASE_URL ?? "";

if (databaseUrl.startsWith("NEXT_PUBLIC_")) {
  console.error(
    "DATABASE_URL に NEXT_PUBLIC_ プレフィックスを付けないでください。",
  );
  console.error("DATABASE_URL はサーバー専用の秘密情報として扱います。");
  process.exit(1);
}

console.log("環境変数チェックに成功しました。");
