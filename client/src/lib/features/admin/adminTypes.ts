//src/lib/features/admin/adminTypes.ts
// These should match the enums in your backend/Prisma schema
export enum SystemRole {
  USER = "USER",
  SYSTEM_CONTENT_CREATOR = "SYSTEM_CONTENT_CREATOR",
  DEVELOPER = "DEVELOPER",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DEACTIVATED = "DEACTIVATED",
  BANNED = "BANNED",
}

export interface AdminUserSanction {
  id: string;
  reason: string;
  type: "SUSPENSION" | "BAN";
  status: "ACTIVE" | "EXPIRED" | "APPEALED";
  expiresAt: string | null;
  createdAt: string;
}

export enum PostCategory {
  PROJECT = "PROJECT",
  BLOG = "BLOG",
  RESOURCE = "RESOURCE",
  ARTICLE = "ARTICLE",
  SHOWCASE = "SHOWCASE",
  DISCUSSION = "DISCUSSION",
  GUIDE = "GUIDE",
}

export enum OpportunityType {
  FULL_TIME = "FULL_TIME",
  PART_TIME = "PART_TIME",
  CONTRACT = "CONTRACT",
  INTERNSHIP = "INTERNSHIP",
  FREELANCE = "FREELANCE",
}

export enum UpdateCategory {
  PLATFORM = "PLATFORM",
  PROJECT = "PROJECT",
  SECURITY = "SECURITY",
  MAINTENANCE = "MAINTENANCE",
}

// --- Data Shapes ---

export interface AdminDashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  totalSaves: number;
  totalShares: number;
  totalOpportunities: number; // Added
  totalUpdates: number; // Added
}

export interface AdminUserRow {
  id: string;
  name: string;
  username: string;
  email: string;
  profileImage: string | null;
  systemRole: SystemRole;
  status: UserStatus;
  joinedAt: string;
  postsCount: number;
  commentsCount: number;
  followersCount?: number;
  followingCount?: number;
  sanctionsReceived?: AdminUserSanction[];
}
export interface AdminPostRow {
  id: string;
  title: string;
  description: string;
  category: PostCategory;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  sharesCount: number;
  savedCount: number;
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
  images: { url: string }[];
}

export interface AdminCommentRow {
  id: string;
  text: string;
  createdAt: string;
  likesCount: number;
  dislikesCount: number;
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
  post: {
    id: string;
    title: string;
  };
}

export interface AdminOpportunityRow {
  id: string;
  title: string;
  companyName: string;
  location: string;
  type: OpportunityType;
  postedAt: string;
  poster: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
  tags: { tag: { name: string } }[];
}

export interface AdminUpdateRow {
  id: string;
  title: string;
  category: UpdateCategory;
  version: string | null;
  publishedAt: string;
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
}

export interface AdminApiQuery {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  filterByRole?: SystemRole;
  filterByStatus?: UserStatus;
  filterByCategory?: PostCategory;
  filterByUpdateCategory?: UpdateCategory;
}
// --- Full API Response Shapes ---

export interface PaginationInfo {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface GetAdminStatsResponse {
  status: string;
  data: AdminDashboardStats;
}

export interface GetAdminUsersResponse {
  status: string;
  data: {
    users: AdminUserRow[];
    pagination: PaginationInfo;
  };
}

export interface GetAdminPostsResponse {
  status: string;
  data: {
    posts: AdminPostRow[];
    pagination: PaginationInfo;
  };
}

export interface GetAdminCommentsResponse {
  status: string;
  data: {
    comments: AdminCommentRow[];
    pagination: PaginationInfo;
  };
}

export interface GetAdminOpportunitiesResponse {
  status: string;
  data: {
    opportunities: AdminOpportunityRow[];
    pagination: PaginationInfo;
  };
}

export interface GetAdminUpdatesResponse {
  status: string;
  data: {
    updates: AdminUpdateRow[];
    pagination: PaginationInfo;
  };
}

export interface SystemConfig {
  id: string;
  maintenanceMode: boolean;
  maintenanceMessage: string | null;
  updatedAt: string;
}

export interface GetSystemConfigResponse {
  status: string;
  data: SystemConfig;
}

export interface UpdateSystemConfigArgs {
  maintenanceMode?: boolean;
  maintenanceMessage?: string;
}
