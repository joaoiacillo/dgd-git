import { Octokit } from "octokit";
import { getRepo, searchRepo } from "../../services/github/repository";
import { useStore, type Repository } from "../../store";
import { getLast4WeeksCommits } from "../../services/github/commits";
import { getLanguagePercents } from "../../services/github/languages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect } from "react";

const octokit = new Octokit();

export const Header = () => {
  const { state, query, setQuery, setRepo, setState } = useStore();

  const search = useCallback(
    async (query: string) => {
      setState("fetching");

      const restRepo = await searchRepo(octokit, query);
      if (!restRepo) return;

      const [popular, commits, languages] = await Promise.all([
        getRepo(octokit, restRepo.owner, restRepo.name),
        getLast4WeeksCommits(octokit, restRepo.owner, restRepo.name),
        getLanguagePercents(octokit, restRepo.owner, restRepo.name),
      ]);

      const bandecly: Repository = {
        name: popular.data.full_name,
        url: popular.data.html_url,
        stars: popular.data.stargazers_count,
        forks: popular.data.forks_count,
        watches: popular.data.subscribers_count,
        thumbnail: restRepo.thumbnail,
        commits,
        languages,
      };

      setRepo(bandecly);
      setState("loaded");
    },
    [setRepo, setState],
  );

  const handleSearch = () => search(`stars:>1 ${query || ""}`);

  useEffect(() => {
    search("stars:>1");
  }, [search]);

  return (
    <header className="border-bottom">
      <div className="container-fluid py-2">
        <div className="row align-items-center">
          <div className="col"></div>
          <div className="col">
            <div className="input-group">
              <input
                type="text"
                className="form-control text-center"
                placeholder={
                  state === "fetching" ? "Loading..." : "Search here"
                }
                disabled={state === "fetching"}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button
                className="btn btn-light"
                disabled={state === "fetching"}
                onClick={handleSearch}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </header>
  );
};
