"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    console.log("LOGIN CLICKED");

    const result = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    console.log("LOGIN RESULT", result);

    window.location.href = "/todos";
  };

  const signup = async () => {
    console.log("SIGNUP CLICKED");

    const result = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("SIGNUP RESULT", result);

    if (result.error) {
      alert(result.error.message);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    window.location.href = "/todos";
  };

  return (
    <main className="p-10">
      <h1>login</h1>

      <label htmlFor="email">メールアドレス</label>
      <input
        id="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">パスワード</label>
      <input
        id="password"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="button" onClick={login}>
        ログイン
      </button>

      <button type="button" onClick={signup}>
        サインアップ
      </button>
    </main>
  );
}
