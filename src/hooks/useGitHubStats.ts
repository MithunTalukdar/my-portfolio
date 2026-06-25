import { useEffect, useState } from "react";

interface GitHubStats {
  repos: number;
  followers: number;
  languages: string[];
  activity: string;
  isLoading: boolean;
}

export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats>({
    repos: 0,
    followers: 0,
    languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
    activity: "Active",
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats() {
      try {
        const [userResponse, reposResponse] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, { signal: controller.signal }),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
          }),
        ]);

        if (!userResponse.ok || !reposResponse.ok) {
          throw new Error("GitHub API request failed");
        }

        const user = await userResponse.json();
        const repos = await reposResponse.json();
        const languages = Array.from(
          new Set(
            repos
              .map((repo: { language: string | null }) => repo.language)
              .filter(Boolean),
          ),
        ).slice(0, 5) as string[];

        setStats({
          repos: user.public_repos || repos.length,
          followers: user.followers || 0,
          languages: languages.length ? languages : ["JavaScript", "React", "Node.js"],
          activity: repos.length ? "Recently updated repositories" : "Building new projects",
          isLoading: false,
        });
      } catch {
        if (!controller.signal.aborted) {
          setStats((current) => ({ ...current, repos: 10, followers: 0, isLoading: false }));
        }
      }
    }

    loadStats();
    return () => controller.abort();
  }, [username]);

  return stats;
}
