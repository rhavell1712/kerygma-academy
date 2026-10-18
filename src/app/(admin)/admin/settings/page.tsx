import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SettingsPageClient } from "./_components/settings-page-client";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) redirect("/admin/login");

  return <SettingsPageClient />;
}
