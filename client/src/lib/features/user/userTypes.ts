// =================================================================
// FILE: src/lib/features/user/userTypes.ts
// =================================================================

export enum SystemRole {
  USER = "USER",
  SYSTEM_CONTENT_CREATOR = "SYSTEM_CONTENT_CREATOR",
  DEVELOPER = "DEVELOPER",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DEACTIVATED = "DEACTIVATED",
  SUSPENDED = "SUSPENDED",
  BANNED = "BANNED",
}

export type SanitizedUserDto = {
  id: string;
  name: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  profileImage: string | null;
  bannerImage: string | null;
  bio: string | null;
  title: string | null;
  location: string | null;
  joinedAt: string;
  updatedAt: string;
  systemRole: SystemRole;
  status: UserStatus;
  twitterUrl: string | null;
  githubUrl: string | null;
  websiteUrl: string | null;
  followersCount: number;
  followingCount: number;
  activeSanction?: {
    reason: string;
    expiresAt: string | null;
    type: string;
    status: "ACTIVE" | "APPEALED" | "EXPIRED";
    appealStatus: "PENDING" | "APPROVED" | "REJECTED" | null;
  };
};

export interface UserProfile extends SanitizedUserDto {
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
  isFollowedByCurrentUser: boolean;
}

export interface UsersState {
  currentUser: SanitizedUserDto | null;
}

// API Response Shapes
export interface GetMeApiResponse {
  status: string;
  data: { user: SanitizedUserDto };
}

export interface UpdateProfileApiResponse {
  status: string;
  message: string;
  data?: { user: SanitizedUserDto };
}

export interface GetUserApiResponse {
  status: string;
  data: UserProfile;
}
