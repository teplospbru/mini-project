import { User, Search, Organization, Repo, SingleUser } from '../types';

const headers = {
  headers: {
    Accept: 'application/vnd.github+json',
  },
};

// здесь делаем запросы
export function fetchGitHubSearch(query: string): Promise<Search> {
  return fetch('https://api.github.com/search/users?q=' + query, headers).then((response) => response.json());
}

export function fetchGitHubUsers(): Promise<User[]> {
  return fetch('https://api.github.com/users', headers).then((response) => response.json());
}

export function fetchGitHubSingleUser(id: string): Promise<SingleUser> {
  return fetch('https://api.github.com/users/' + id, headers).then((response) => response.json());
}

export function fetchGitHubOrganizations(url: string): Promise<Organization[]> {
  return fetch(url, headers).then((response) => response.json());
}

export function fetchGitHubRepos(url: string): Promise<Repo[]> {
  return fetch(url + '?per_page=1000', headers).then((response) => response.json());
}

// здесь собираем результаты запросов "организация" и "репозитории"
export const queries = async (users: User[]) => {
  const organizations = await Promise.all(
    users.map((user) => {
      return fetchGitHubOrganizations(user.organizations_url);
    })
  );

  const repos = await Promise.all(
    users.map((user) => {
      return fetchGitHubSingleUser(user.login);
    })
  );

  return [organizations, repos] as const;
};
