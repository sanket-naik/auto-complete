export const feetchGithubUserAPI = (username: string) => {
  return fetch(
    `https://api.github.com/search/users?q=${username}&per_page=8`
  ).then((res) => res.json());
};
