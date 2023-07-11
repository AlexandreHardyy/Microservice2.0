/* eslint-disable */
import { User, UserRole } from "../user/message";

export const protobufPackage = "auth";

export interface LoginRequest {
  email?: string;
  password?: string;
  ip?: string;
}

export interface LoginResponse {
  refreshToken?: string;
  jwt?: string;
  status?: LoginResponse_STATUS;
  user?: User;
}

export enum LoginResponse_STATUS {
  OK = 0,
  WRONG_PASSWORD = 1,
  NOT_FOUND = 2,
  INTERNAL = 3,
  UNRECOGNIZED = -1,
}

export interface RefreshTokenRequest {
  refreshToken?: string;
  ip?: string;
}

export interface RefreshTokenResponse {
  refreshToken?: string;
  jwt?: string;
  userId?: string;
}

export interface ValidateRequest {
  /** Add role here */
  jwt?: string;
}

export interface ValidateResponse {
  ok?: boolean;
  userId?: string;
  userEmail?: string;
  userRole?: UserRole;
  internal?: boolean;
}

export const AUTH_PACKAGE_NAME = "auth";
