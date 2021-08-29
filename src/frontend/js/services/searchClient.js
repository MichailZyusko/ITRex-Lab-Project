import { getSearchingClient } from '../methods/index.js';

export default async (searchString) => {
  const searchResult = await getSearchingClient(searchString);

  if (searchResult.ok) {
    return JSON.stringify(searchResult.result[0], null, 2);
  }

  const { result: { message } } = searchResult;

  return `Error: ${message}`;
};
