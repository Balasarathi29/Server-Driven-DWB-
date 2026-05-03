export type UserRole = "super-admin" | "admin" | "editor" | "viewer";

export interface Institution {
  id: string;
  name: string;
  subdomain: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutionId: string;
  institution?: Institution;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  institution?: Institution;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  user: User;
  institution: Institution;
  accessToken: string;
  refreshToken: string;
}
