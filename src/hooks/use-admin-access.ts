"use client";

import { useEffect, useState } from "react";
import { checkAdminAction } from "@/app/actions/settings";
import { createClient } from "@/lib/supabase/client";

export function useAdminAccess() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    async function verify() {
      try {
        const res = await checkAdminAction();
        if (active) setIsAdmin(res.isAdmin);
      } catch (err) {
        console.error("Falha ao verificar acesso administrativo:", err);
        if (active) setIsAdmin(false);
      }
    }

    verify();

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (
        event === "INITIAL_SESSION" ||
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED"
      ) {
        verify();
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return isAdmin;
}
