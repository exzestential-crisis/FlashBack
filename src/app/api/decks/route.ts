// app/api/decks/route.ts
import { NextResponse } from "next/server";
import { getUserDecksWithCounts } from "@/db/queries/deck";
import { createServerSupabaseClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createServerSupabaseClient();

  // This is the secure way to get the user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const userId = user.id;
  const decks = await getUserDecksWithCounts(userId);

  return NextResponse.json(decks);
}
