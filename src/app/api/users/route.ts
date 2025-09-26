// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseAdmin } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseAdmin();

    // Parse the request body
    const data = await request.json();

    // Validate required fields
    const { user_id, email, username, user_type, interests } = data;

    if (!user_id || !email || !username) {
      return NextResponse.json(
        { error: "Missing required fields: user_id, email, username" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 = no rows found
      console.error("Error checking existing user:", checkError);
      return NextResponse.json(
        { error: "Database error while checking user" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists", user: existingUser },
        { status: 409 }
      );
    }

    // Create the user profile
    const userProfile = {
      user_id,
      email,
      username,
      user_type: user_type || null,
      interests: interests || [],
      provider: data.provider || "email",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([userProfile])
      .select()
      .single();

    if (insertError) {
      console.error("Error creating user:", insertError);

      // Handle specific database errors
      if (insertError.code === "23505") {
        // Unique constraint violation
        return NextResponse.json(
          { error: "Username or email already exists" },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: "Failed to create user profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User created successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: Add GET method to fetch user profile
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json(
        { error: "user_id parameter is required" },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      console.error("Error fetching user:", error);
      return NextResponse.json(
        { error: "Failed to fetch user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
