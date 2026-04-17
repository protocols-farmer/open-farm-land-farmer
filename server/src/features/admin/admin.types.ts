//src/features/admin/admin.types.ts
import {
  User,
  Post,
  Comment,
  PostCategory,
  UserStatus,
  Opportunity,
  Update,
  UpdateCategory,
  UserSanction,
} from "@prisma-client";

export type SanitizedUser = Omit<User, "hashedPassword"> & {
  activeSanction?: {
    reason: string;
    expiresAt: Date | null;
    type: string;
  };
};

export interface AdminDashboardStats {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalLikes: number;
  totalSaves: number;
  totalShares: number;
  totalOpportunities: number;
  totalUpdates: number;
}

export type AdminUserRow = SanitizedUser & {
  postsCount: number;
  commentsCount: number;
  sanctionsReceived?: UserSanction[];
};

export type AdminPostRow = Post & {
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
  images: { url: string }[];
};

export type AdminCommentRow = Comment & {
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
};

export type AdminOpportunityRow = Opportunity & {
  poster: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
  tags: { tag: { name: string } }[];
};

export type AdminUpdateRow = Update & {
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
};

export interface AdminApiQuery {
  page?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  order?: "asc" | "desc";
  filterByRole?: UserStatus;
  filterByCategory?: PostCategory;
  filterByUpdateCategory?: UpdateCategory;
}
