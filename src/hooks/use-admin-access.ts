"use client";

import { useEffect, useState } from "react";
import { checkAdminAction } from "@/app/actions/settings";

export function useAdminAccess() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;

    checkAdminAction()
      .then((res) => {
        if (active) setIsAdmin(res.isAdmin);
      })
      .catch((err) => {
        console.error("Falha ao verificar acesso administrativo:", err);
        if (active) setIsAdmin(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return isAdmin;
}
