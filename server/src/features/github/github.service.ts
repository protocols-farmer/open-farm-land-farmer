// server/src/features/github/github.service.ts

import { config } from "@/config/index.js";
import { createHttpError } from "@/utils/error.factory.js";
import { logger } from "@/config/logger.js";
import {
  GitHubResponseDto,
  RawGitHubGraphResponse,
  RawGitHubRepoResponse,
  RawGitHubProfileResponse,
} from "./github.types.js";

export class GitHubService {
  private readonly baseUrl = "https://api.github.com/graphql";

  public async getGitHubData(
    owner: string,
    repoName?: string
  ): Promise<GitHubResponseDto> {
    const isRepoRequest = !!repoName;
    const query = isRepoRequest ? this.getRepoQuery() : this.getProfileQuery();
    const variables = isRepoRequest
      ? { owner, name: repoName }
      : { login: owner };

    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.github.pat}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      // FIXED: Use the interface here to tell TS what the response looks like
      const result = (await response.json()) as RawGitHubGraphResponse;

      if (!response.ok || result.errors) {
        logger.error(
          { err: result.errors, owner, repoName },
          "GitHub GraphQL Error"
        );
        throw createHttpError(
          response.status || 500,
          result.errors?.[0]?.message || "GitHub API Error"
        );
      }

      // Type Guards to handle the polymorphic data
      if (isRepoRequest && "repository" in result.data) {
        return this.transformRepoData(
          (result.data as RawGitHubRepoResponse).repository
        );
      }

      if (!isRepoRequest && "user" in result.data) {
        return this.transformProfileData(
          (result.data as RawGitHubProfileResponse).user
        );
      }

      throw createHttpError(404, "Requested GitHub entity not found.");
    } catch (error) {
      if (error instanceof Error && (error as any).statusCode) throw error;
      logger.error({ err: error }, "GitHub Service Exception");
      throw createHttpError(500, "Internal server error fetching GitHub data.");
    }
  }

  private getRepoQuery(): string {
    return `
      query getRepo($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          name
          description
          stargazerCount
          forkCount
          primaryLanguage { name color }
          languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              size
              node { name color }
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history(first: 10) {
                  edges {
                    node {
                      oid
                      message
                      committedDate
                      author { name avatarUrl }
                    }
                  }
                }
              }
            }
          }
          mentionableUsers(first: 1) { totalCount }
        }
      }
    `;
  }

  private getProfileQuery(): string {
    return `
      query getProfile($login: String!) {
        user(login: $login) {
          name
          login
          avatarUrl
          bio
          followers { totalCount }
          following { totalCount }
          repositories(first: 1) { totalCount }
          starredRepositories { totalCount }
        }
      }
    `;
  }

  private transformRepoData(
    repo: RawGitHubRepoResponse["repository"]
  ): GitHubResponseDto {
    return {
      type: "REPO",
      name: repo.name,
      description: repo.description,
      primaryLanguage: repo.primaryLanguage,
      stats: {
        stars: repo.stargazerCount,
        forks: repo.forkCount,
        contributors: repo.mentionableUsers.totalCount,
      },
      languages: repo.languages.edges.map((e) => ({
        name: e.node.name,
        color: e.node.color,
        size: e.size,
      })),
      recentCommits: repo.defaultBranchRef.target.history.edges.map((e) => ({
        sha: e.node.oid,
        message: e.node.message,
        date: e.node.committedDate,
        author: {
          name: e.node.author.name,
          avatarUrl: e.node.author.avatarUrl,
        },
      })),
    };
  }

  private transformProfileData(
    user: RawGitHubProfileResponse["user"]
  ): GitHubResponseDto {
    return {
      type: "USER",
      name: user.name || user.login,
      handle: user.login,
      avatar: user.avatarUrl,
      bio: user.bio,
      stats: {
        followers: user.followers.totalCount,
        following: user.following.totalCount,
        publicRepos: user.repositories.totalCount,
        totalStars: user.starredRepositories.totalCount,
      },
    };
  }
}

export const githubService = new GitHubService();
