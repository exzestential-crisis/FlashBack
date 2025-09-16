// // lib/auth.ts - Typed Auth Utilities
export {};

// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import type {
//   AuthTokenPayload,
//   PublicUser,
//   AuthenticatedRequest,
//   DatabaseUser,
// } from "@/types/auth";

// const JWT_SECRET = process.env.JWT_SECRET;
// if (!JWT_SECRET) {
//   throw new Error("JWT_SECRET environment variable is required");
// }

// // 1. Create JWT token with proper typing
// export function createToken(
//   payload: Omit<AuthTokenPayload, "iat" | "exp">
// ): string {
//   return jwt.sign(payload, JWT_SECRET as string, { expiresIn: "7d" });
// }

// // 2. Verify JWT token with proper return type
// export function verifyToken(token: string): AuthTokenPayload | null {
//   try {
//     const decoded = jwt.verify(
//       token,
//       JWT_SECRET as string
//     ) as unknown as AuthTokenPayload;
//     return decoded;
//   } catch (error) {
//     return null;
//   }
// }

// // 3. Hash password
// export async function hashPassword(password: string): Promise<string> {
//   return await bcrypt.hash(password, 12);
// }

// // 4. Compare password
// export async function comparePassword(
//   password: string,
//   hashedPassword: string
// ): Promise<boolean> {
//   return await bcrypt.compare(password, hashedPassword);
// }

// // 5. Extract token from request
// export function getTokenFromRequest(request: Request): string | null {
//   // Check Authorization header
//   const authHeader = request.headers.get("authorization");
//   if (authHeader?.startsWith("Bearer ")) {
//     return authHeader.substring(7);
//   }

//   // Check cookies
//   const cookieHeader = request.headers.get("cookie");
//   if (cookieHeader) {
//     const cookies = Object.fromEntries(
//       cookieHeader.split("; ").map((c) => {
//         const [key, value] = c.split("=");
//         return [key, value];
//       })
//     );
//     return cookies.authToken || null;
//   }

//   return null;
// }

// // 6. Typed middleware for protected routes
// export function requireAuth<T extends any[]>(
//   handler: (request: AuthenticatedRequest, ...args: T) => Promise<Response>
// ) {
//   return async (request: Request, ...args: T): Promise<Response> => {
//     const token = getTokenFromRequest(request);
//     const payload = verifyToken(token || "");

//     if (!payload) {
//       return Response.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // Type assertion - we know this is safe because we verified the token
//     const authenticatedRequest = request as AuthenticatedRequest;
//     authenticatedRequest.user = payload;

//     return handler(authenticatedRequest, ...args);
//   };
// }

// // 7. Convert database user to public user (remove sensitive fields)
// export function toPublicUser(user: DatabaseUser): PublicUser {
//   return {
//     id: user.id,
//     email: user.email,
//     name: user.name,
//     avatar: user.avatar,
//     emailVerified: user.emailVerified,
//   };
// }

// // 8. Validate email format
// export function isValidEmail(email: string): boolean {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// }

// // 9. Validate password strength
// export interface PasswordValidation {
//   isValid: boolean;
//   errors: string[];
// }

// export function validatePassword(password: string): PasswordValidation {
//   const errors: string[] = [];

//   if (password.length < 8) {
//     errors.push("Password must be at least 8 characters long");
//   }

//   if (!/(?=.*[a-z])/.test(password)) {
//     errors.push("Password must contain at least one lowercase letter");
//   }

//   if (!/(?=.*[A-Z])/.test(password)) {
//     errors.push("Password must contain at least one uppercase letter");
//   }

//   if (!/(?=.*\d)/.test(password)) {
//     errors.push("Password must contain at least one number");
//   }

//   if (!/(?=.*[@$!%*?&])/.test(password)) {
//     errors.push("Password must contain at least one special character");
//   }

//   return {
//     isValid: errors.length === 0,
//     errors,
//   };
// }

// // 10. Generate secure cookie string
// export function createAuthCookie(token: string): string {
//   const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds

//   return `authToken=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=${maxAge}; Path=/`;
// }

// // 11. Create logout cookie
// export function createLogoutCookie(): string {
//   return "authToken=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/";
// }
