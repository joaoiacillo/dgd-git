import type { Octokit } from "octokit";

export interface RestCommit extends Record<string, string | number> {
  day: string;
  count: number;
}

export const getLast4WeeksCommits = async (
  octokit: Octokit,
  owner: string,
  repo: string,
) => {
  const date = new Date(Date.now());
  date.setDate(date.getDate() - 28);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const since = `${year}-${month}-${day}T00:00:00Z`;

  const response = await octokit.rest.repos.listCommits({
    owner,
    repo,
    since,
    per_page: 100,
  });

  const commits: RestCommit[] = [];

  response.data.forEach((c) => {
    if (!c.commit.author?.date) return;
    const date = new Date(c.commit.author.date);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.getMonth().toString().padStart(2, "0");
    const dateKey = `${month}-${day}`;

    const commit = commits.find((c2) => c2.day === dateKey);
    if (commit) {
      commit.count++;
    } else {
      commits.push({
        day: dateKey,
        count: 1,
      });
    }
  });

  return commits;
};
