// server/src/features/github/github.types.ts

/**
 * SHARED UTILITY TYPES
 */
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

/**
 * DATA TRANSFER OBJECTS (DTOs) - Sent to Frontend
 */

export interface GitHubRepoPulseDto {
  type: "REPO";
  name: string;
  description: string | null;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  stats: {
    stars: number;
    forks: number;
    contributors: number;
  };
  languages: GitHubLanguage[];
  recentCommits: GitHubCommit[];
}

export interface GitHubProfileDto {
  type: "USER";
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

// Discriminated Union for the API response
export type GitHubResponseDto = GitHubRepoPulseDto | GitHubProfileDto;

/**
 * RAW GRAPHQL RESPONSE SHAPES
 */

export interface RawGitHubRepoResponse {
  repository: {
    name: string;
    description: string | null;
    stargazerCount: number;
    forkCount: number;
    primaryLanguage: {
      name: string;
      color: string;
    } | null;
    languages: {
      edges: Array<{
        size: number;
        node: {
          name: string;
          color: string;
        };
      }>;
    };
    defaultBranchRef: {
      target: {
        history: {
          edges: Array<{
            node: {
              oid: string;
              message: string;
              committedDate: string;
              author: {
                name: string;
                avatarUrl: string;
              };
            };
          }>;
        };
      };
    };
    mentionableUsers: {
      totalCount: number;
    };
  };
}

export interface RawGitHubProfileResponse {
  user: {
    name: string | null;
    login: string;
    avatarUrl: string;
    bio: string | null;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: { totalCount: number };
    starredRepositories: { totalCount: number };
  };
}

// Combined type for the service's internal fetch
export interface RawGitHubGraphResponse {
  data: RawGitHubRepoResponse | RawGitHubProfileResponse;
  errors?: Array<{ message: string }>;
}
