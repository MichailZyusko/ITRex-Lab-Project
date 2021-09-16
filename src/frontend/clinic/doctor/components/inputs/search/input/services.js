import getAllPatientsLikeValue from './methods.js';

export default async (text) => {
  const searchResult = await getAllPatientsLikeValue(text);

  if (searchResult) {
    return searchResult;
  }

  return false;
};
