import getResolutionByID from './methods.js';

export default async (resolutionID) => {
  const searchResult = await getResolutionByID(resolutionID);

  if (searchResult) {
    return searchResult;
  }
};
