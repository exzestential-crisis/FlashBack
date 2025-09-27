import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/tables/users";
import { createServerSupabaseClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function getAuthenticatedUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return {
      error: true,
      response: NextResponse.json({ error: "Not logged in" }, { status: 401 }),
    };
  }

  // Correct Drizzle usage with eq()
  const dbUser = (
    await db
      .select({ userId: users.userId })
      .from(users)
      .where(eq(users.authId, user.id))
      .limit(1)
  )[0];

  if (!dbUser) {
    return {
      error: true,
      response: NextResponse.json(
        { error: "User not found in DB" },
        { status: 401 }
      ),
    };
  }

  return { error: false, user: { ...user, user_id: dbUser.userId } };
}
