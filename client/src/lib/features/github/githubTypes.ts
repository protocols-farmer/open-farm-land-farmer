// client/src/lib/features/github/githubTypes.ts

export interface GitHubLanguage {
  name: string;
  color: string;
  size: number;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  date: string;
  author: {
    name: string;
    avatarUrl: string;
  };
}

// DTO for Repository
export interface GitHubRepoPulseDto {
  type: "REPO"; // <-- This is what was missing
  name: string;
  description: string | null;
  primaryLanguage: { name: string; color: string } | null;
  stats: {
    stars: number;
    forks: number;
    contributors: number;
  };
  languages: GitHubLanguage[];
  recentCommits: GitHubCommit[];
}

// DTO for User Profile
export interface GitHubProfileDto {
  type: "USER"; // <-- Discriminated Union member
  name: string;
  handle: string;
  avatar: string;
  bio: string | null;
  stats: {
    followers: number;
    following: number;
    publicRepos: number;
    totalStars: number;
  };
}

// The combined type used by the API Slice
export type GitHubResponseDto = GitHubRepoPulseDto | GitHubProfileDto;

export interface GitHubPulseApiResponse {
  status: "success" | "error";
  data: GitHubResponseDto;
}
