import type { Octokit } from "octokit";

export interface RestRepository {
  owner: string;
  thumbnail: string;
  name: string;
}

export const searchRepo = async (
  octokit: Octokit,
  q: string,
): Promise<RestRepository | null> => {
  const response = await octokit.rest.search.repos({
    q,
    order: "desc",
    sort: "stars",
  });

  const repo = response.data.items[0];

  // TODO: what if items has no length?

  if (!repo.owner) return null;

  return {
    owner: repo.owner.login,
    thumbnail: repo.owner.avatar_url,
    name: repo.name,
  };
};

export const getRepo = (octokit: Octokit, owner: string, repo: string) => {
  return octokit.rest.repos.get({
    owner,
    repo,
  });
};
