// types/auth.ts - Auth Type Definitions

import { JwtPayload } from "jsonwebtoken";

// Core User Types
export interface User {
  id: number;
  email: string;
  name: string | null;
  avatar?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Database User (includes sensitive fields)
export interface DatabaseUser extends User {
  passwordHash: string | null;
  googleId: string | null;
  githubId: string | null;
}

// Public User (safe to send to client)
export interface PublicUser {
  id: number;
  email: string;
  name: string | null;
  avatar?: string | null;
  emailVerified: boolean;
}

// JWT Payload
export interface AuthTokenPayload extends JwtPayload {
  userId: number;
  email: string;
  name: string | null;
  iat?: number; // issued at
  exp?: number; // expires at
}

// API Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: PublicUser;
}

export interface AuthError {
  error: string;
  details: string[];
}

// OAuth Types
export interface OAuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface GoogleOAuthUser extends OAuthUser {
  given_name: string;
  family_name: string;
  picture: string;
  email_verified: boolean;
}

// Context Types
export interface AuthContext {
  user: PublicUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<AuthResult>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

export interface AuthResult {
  success: boolean;
  error?: string;
}

// Request Extensions
export interface AuthenticatedRequest extends Request {
  user: AuthTokenPayload;
}

// Session Types (if using database sessions)
export interface Session {
  id: string;
  userId: number;
  expiresAt: Date;
  createdAt: Date;
}
