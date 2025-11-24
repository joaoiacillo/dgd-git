import { create } from "zustand";

import type { RestCommit } from "./services/github/commits";
import type { RestLanguage } from "./services/github/languages";

export interface Repository {
  name: string;
  url: string;
  stars: number;
  forks: number;
  watches: number;
  thumbnail?: string;
  commits: RestCommit[];
  languages: RestLanguage[];
}

interface Store {
  state: "fetching" | "loaded" | "error";
  setState: (state: "fetching" | "loaded" | "error") => void;
  error?: string;
  setError: (error: string) => void;

  query: string;
  setQuery: (query: string) => void;

  repo?: Repository;
  setRepo: (repo: Repository) => void;
}

export const useStore = create<Store>((set) => ({
  state: "fetching",
  setState: (state: "fetching" | "loaded" | "error") => set({ state }),
  setError: (error: string) => set({ error }),

  query: "",
  setQuery: (query: string) => set({ query: query.trim() }),

  repo: undefined,
  setRepo: (repo: Repository) => set({ repo }),
}));
