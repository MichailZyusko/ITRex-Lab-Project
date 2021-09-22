import getSearchingClient from './methods.js';

/**
 * Получает данные пациента
 *
 * @param {string} patientID - UUID пациента
 * @returns {Promise<string|*>}
 */

export default async (patientID) => {
  const searchResult = await getSearchingClient(patientID);

  if (searchResult.ok) {
    return searchResult.result;
  }

  const { result: { message } } = searchResult;

  return `Error: ${message}`;
};
