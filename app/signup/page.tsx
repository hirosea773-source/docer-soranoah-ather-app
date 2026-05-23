"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    await supabase.auth.signUp({
      email,
      password,
    });
    await new Promise((resolve) => setTimeout(resolve, 500));

    window.location.href = "/todos";
  };

  return (
    <main className="p-10 flex flex-col gap-4">
      <input
        placeholder="email"
        className="border p-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        className="border p-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="border p-2" onClick={signup}>
        signup
      </button>
    </main>
  );
}
