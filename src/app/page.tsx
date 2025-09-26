// app/page.tsx (or wherever your HomePage is)
import React from "react";
import { createServerSupabaseClient } from "@/utils/supabase/server"; // Use regular client
import PublicHome from "./(public)/PublicHome";
import PrivateHome from "./(private)/(dashboard)/(home)/PrivateHome";
export default async function HomePage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoggedIn = !!session;

  if (isLoggedIn) {
    return <PrivateHome />;
  } else {
    return <PublicHome />;
  }
}
