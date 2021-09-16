import getSearchingClient from './methods.js';

export default async (patientID) => {
  const searchResult = await getSearchingClient(patientID);

  if (searchResult.ok) {
    return searchResult.result;
  }

  const { result: { message } } = searchResult;

  return `Error: ${message}`;
};
