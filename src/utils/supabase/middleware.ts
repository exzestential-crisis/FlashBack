// Approach 3: Smart home redirect
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const currentPath = request.nextUrl.pathname;

  // Skip auth check for API routes
  if (currentPath.startsWith("/api/")) return supabaseResponse;

  // Define public routes (excluding "/" for special handling)
  const publicRoutes = ["/login", "/signup", "/about"];

  const isPublicRoute = publicRoutes.some(
    (route) => currentPath === route || currentPath.startsWith(route + "/")
  );

  // Create Supabase client for auth check
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Smart "/" redirect
  if (currentPath === "/") {
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return supabaseResponse; // Show public landing page
    }
  }

  // If public route, allow
  if (isPublicRoute) return supabaseResponse;

  // Everything else is protected
  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", currentPath);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
