import { getSearchingClient } from '../methods/index.js';

export default async (searchString) => {
  const searchResult = await getSearchingClient(searchString);

  return JSON.stringify(searchResult, null, 2);
};
