import type { Octokit } from "octokit";

export interface RestLanguage extends Record<string, string | number> {
  id: number;
  value: number;
  label: string;
}

export const getLanguagePercents = async (
  octokit: Octokit,
  owner: string,
  repo: string,
): Promise<RestLanguage[]> => {
  const response = await octokit.rest.repos.listLanguages({
    owner,
    repo,
  });

  const total = Object.keys(response.data).reduce(
    (acc, name) => acc + response.data[name],
    0,
  );

  return Object.keys(response.data).map((key, id) => ({
    id,
    label: key,
    value: (response.data[key] / total) * 100,
  })) as RestLanguage[];
};
