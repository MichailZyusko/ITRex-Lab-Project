import getAllPatientsLikeValue from './methods.js';

/**
 * Получаем всех пациентов, у которых в фамилии, email или имени содержится text
 *
 * @param {string} text - строка для поиска
 * @returns {Promise<*|boolean>}
 */

export default async (text) => {
  const searchResult = await getAllPatientsLikeValue(text);

  if (searchResult) {
    return searchResult;
  }

  return false;
};
