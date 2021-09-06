import getSearchingClient from './methods.js';

export default async (lastName, firstName, email) => {
  const searchResult = await getSearchingClient(lastName, firstName, email);

  if (searchResult.ok) {
    return searchResult.result;
  }

  const { result: { message } } = searchResult;

  return `Error: ${message}`;
};
