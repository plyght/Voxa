import { fileExists, readFile, writeFile } from './file';
import path from 'path';

export const getCachePath = (id) => {
  const pathName = `./build/cache/${id}.json`;

  return path.resolve(process.cwd(), pathName);
};

export const fetchWithCache = async (id, req) => {
  const pathName = getCachePath(id);

  if (fileExists(pathName)) {
    const file = await readFile(pathName);

    return await file;
  } else {
    let res = await fetch(req);
    let result = await res.json();

    await writeFile(pathName, result);

    return result;
  }
};

export const fetchGitHubUser = async (username) => {
  const url = `https://api.github.com/users/${username}`;

  return await fetchWithCache(`github-users/${username}`, url);
};
