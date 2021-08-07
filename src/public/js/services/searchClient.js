import setQueue from '../methods/POST.js';

export default async (searchString) => {
  const searchResult = await setQueue({ search: searchString }, 'output/searchClient');

  return JSON.stringify(searchResult, null, 4);
};
