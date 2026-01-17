// =================================================================
// FILE: src/lib/features/user/userTypes.ts
// =================================================================
export enum SystemRole {
  USER = "USER",
  SYSTEM_CONTENT_CREATOR = "SYSTEM_CONTENT_CREATOR",
  DEVELOPER = "DEVELOPER",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum UserRole {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export type SanitizedUserDto = {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string | null;
  bannerImage: string | null;
  bio: string | null;
  title: string | null;
  location: string | null;
  joinedAt: string;
  updatedAt: string;
  systemRole: SystemRole;
  userRole: UserRole;
  twitterUrl: string | null;
  githubUrl: string | null;
  websiteUrl: string | null;
  // --- ADDED THESE TWO FIELDS ---
  followersCount: number;
  followingCount: number;
  // ------------------------------
};

export interface UserProfile extends SanitizedUserDto {
  _count: {
    followers: number;
    following: number;
    posts: number;
  };
  isFollowedByCurrentUser: boolean;
}

export type CurrentUser = SanitizedUserDto;

export interface UsersState {
  currentUser: CurrentUser | null;
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

export interface DeleteAccountApiResponse {
  status: string;
  message: string;
}

export interface GetUserApiResponse {
  status: string;
  data: UserProfile;
}
