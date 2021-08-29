import { searchClient } from '../services/index.js';

const searchBlock = document.getElementById('searchResult');

const setSearchResult = async (searchString) => {
  const response = await searchClient(searchString);
  try {
    JSON.parse(response);
    searchBlock.textContent = response;
    return 'We found something for you';
  } catch (error) {
    return response;
  }
};

export default () => {
  const searchString = document.getElementById('search').value.trim();

  if (!searchString) {
    return 'Nothing was found for your query ';
  }

  return setSearchResult(searchString);
};
