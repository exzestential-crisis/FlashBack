// app/auth/callback/route.ts
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      // Redirect to login page with error
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }
  }

  // Redirect to home page after successful authentication
  return NextResponse.redirect(`${origin}/`);
}
