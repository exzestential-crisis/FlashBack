//db/index.ts

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Use service role for server-side only (NEVER expose in client-side code!)
const client = postgres(process.env.DATABASE_URL as string, { ssl: "require" });

// Attach Drizzle to Supabase’s Postgres
export const db = drizzle(client);

// // Optional: Supabase client (for auth, storage, etc.)
// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );
