"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

export default function SettingsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    checkUser();
  }, [supabase, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return <div className="text-center mt-10 dark:text-white">読み込み中...</div>;
  }

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">設定</h1>
      
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 dark:text-white">アカウント設定</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">ログイン中: {user.email}</p>
        </div>

        <div className="p-4 border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-lg font-semibold mb-2 text-gray-400 dark:text-gray-500">その他の設定項目（準備中）</h2>
          <p className="text-xs text-gray-400 dark:text-gray-500">プロフィール編集、通知設定などの項目は、本番機能の実装時に追加されます。</p>
        </div>

        <Button 
          variant="destructive" 
          className="w-full" 
          onClick={handleSignOut}
        >
          ログアウト
        </Button>
      </div>
    </div>
  );
}
