"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

export default function TodosPage() {
  useEffect(() => {
    const check = async () => {
      const supabase = createClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      console.log(session);
    };

    check();
  }, []);

  return <div>protected page</div>;
}
