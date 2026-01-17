// client/src/lib/features/github/githubApiSlice.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../api/baseQueryWithReauth";
import { GitHubResponseDto, GitHubPulseApiResponse } from "./githubTypes";

export const githubApiSlice = createApi({
  reducerPath: "githubApi",
  baseQuery: baseQueryWithReauth,
  // Cache for 5 minutes to respect our backend PAT limits
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    /**
     * Fetches polymorphic GitHub data (Repo or User) from our backend proxy.
     */
    getRepoPulse: builder.query<GitHubResponseDto, string>({
      query: (repoUrl) => ({
        url: "/github/repo-pulse",
        params: { url: repoUrl },
      }),
      transformResponse: (response: GitHubPulseApiResponse) => response.data,
    }),
  }),
});

export const { useGetRepoPulseQuery } = githubApiSlice;
