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
// Data shape for the main dashboard statistics card
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

// Data shape for a user row
export type AdminUserRow = SanitizedUser & {
  postsCount: number; // Flattened
  commentsCount: number; // Flattened
  sanctionsReceived?: UserSanction[];
};

// Data shape for a post row
export type AdminPostRow = Post & {
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
  images: { url: string }[];
};

// Data shape for a comment row
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

// Data shape for an opportunity row
export type AdminOpportunityRow = Opportunity & {
  poster: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
  tags: { tag: { name: string } }[];
};

// Data shape for a platform update row
export type AdminUpdateRow = Update & {
  author: {
    id: string;
    name: string;
    username: string;
    profileImage: string | null;
  };
};

// Type for the API query parameters
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
