// client/src/lib/features/github/githubUtils.ts

import { GitHubLanguage, GitHubCommit } from "./githubTypes";

export interface LanguagePercentage {
  name: string;
  color: string;
  percentage: number;
}

/**
 * Strictly typed utility for Repository Language DNA
 */
export const calculateLanguagePercentages = (
  languages: GitHubLanguage[]
): LanguagePercentage[] => {
  const totalSize = languages.reduce((acc, lang) => acc + lang.size, 0);
  if (totalSize === 0) return [];

  return languages.map((lang) => ({
    name: lang.name,
    color: lang.color,
    percentage: parseFloat(((lang.size / totalSize) * 100).toFixed(1)),
  }));
};

/**
 * Activity Pulse logic
 */
export const getProjectPulseStatus = (commits: GitHubCommit[]) => {
  if (commits.length === 0)
    return { label: "Stale", color: "#6b7280", animate: false };

  const latestDate = new Date(commits[0].date);
  const diffDays = Math.ceil(
    Math.abs(Date.now() - latestDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 7)
    return { label: "Active Pulse", color: "#22c55e", animate: true };
  if (diffDays <= 30)
    return { label: "Steady", color: "#eab308", animate: false };
  return { label: "Quiet", color: "#f97316", animate: false };
};
