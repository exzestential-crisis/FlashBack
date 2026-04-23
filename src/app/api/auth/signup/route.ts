// app/api/auth/signup/route.ts
import { createUnauthenticatedSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    const { username, email, password, user_type, interests, code } = body;

    console.log("Extracted fields:", {
      username,
      email,
      password: "[HIDDEN]",
      code,
      user_type,
      interests,
    });

    // Validate required fields
    if (!username || !email || !password || !user_type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Use the unauthenticated client for signup
    const supabase = await createUnauthenticatedSupabaseClient();

    // Create account in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password,
      options: {
        data: {
          username,
          user_type,
          interests: interests || [],
          code: code || null,
        },
      },
    });

    if (authError) {
      console.error("Signup error:", authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Check if user was created successfully
    if (!authData.user) {
      return NextResponse.json(
        { error: "Failed to create user account" },
        { status: 500 }
      );
    }

    console.log("User created successfully:", authData.user.id);

    // If you need to insert additional data into a users table, do it here
    // Example:
    /*
    const { error: dbError } = await supabase
      .from("users")
      .insert({
        auth_id: authData.user.id,
        username,
        email: email.toLowerCase(),
        user_type,
        interests: interests || [],
        code: code || null,
        created_at: new Date().toISOString()
      });

    if (dbError) {
      console.error("Database insert error:", dbError);
      // Note: User is created in auth but not in users table
      // You might want to handle this case appropriately
    }
    */

    return NextResponse.json(
      {
        message: "Account created successfully",
        user: {
          id: authData.user.id,
          email: authData.user.email,
          username,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
