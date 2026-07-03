import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/login");
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">プロフィール</h1>
      <div className="space-y-2 dark:text-gray-300">
        <p><strong>ユーザーID:</strong> {user.id}</p>
        <p><strong>メールアドレス:</strong> {user.email}</p>
        <p><strong>作成日時:</strong> {user.created_at ? new Date(user.created_at).toLocaleString("ja-JP") : "N/A"}</p>
      </div>
    </div>
  );
}
