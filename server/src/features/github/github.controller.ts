//src/features/github/github.controller.ts
import { Request, Response } from "express";
import { asyncHandler } from "@/middleware/asyncHandler.js";
import { githubService } from "./github.service.js";
import { createHttpError } from "@/utils/error.factory.js";
import { logger } from "@/config/logger.js";

class GitHubController {
  /**
   * GET /api/v1/github/repo-pulse
   * Parses a GitHub URL and returns either Repository Pulse or User Profile data.
   */
  getRepoPulse = asyncHandler(async (req: Request, res: Response) => {
    const { url } = req.query;

    if (!url || typeof url !== "string") {
      throw createHttpError(400, "A valid GitHub URL is required.");
    }

    let sanitizedUrl = url.trim();
    if (!sanitizedUrl.startsWith("http")) {
      sanitizedUrl = `https://${sanitizedUrl}`;
    }

    try {
      const githubUrl = new URL(sanitizedUrl);

      if (!githubUrl.hostname.includes("github.com")) {
        throw createHttpError(
          400,
          "Only GitHub URLs are supported for integration insights.",
        );
      }

      const parts = githubUrl.pathname.split("/").filter(Boolean);

      if (parts.length === 0) {
        throw createHttpError(
          400,
          "The provided GitHub URL is missing a user or repository path.",
        );
      }

      const owner = parts[0];
      const repoName = parts[1];

      const data = await githubService.getGitHubData(owner, repoName);

      logger.info(
        { owner, repoName, type: data.type },
        "GitHub Data Successfully Fetched",
      );

      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error: unknown) {
      if (error instanceof Error && (error as any).statusCode) {
        throw error;
      }

      logger.error(
        { err: error, url: sanitizedUrl },
        "GitHub Controller Failure",
      );

      throw createHttpError(
        400,
        "Could not parse GitHub data. Ensure the URL is public and formatted correctly.",
      );
    }
  });
}

export const githubController = new GitHubController();
