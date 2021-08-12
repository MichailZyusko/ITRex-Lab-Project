import { searchClient } from '../services/index.js';

const searchBlock = document.getElementById('searchResult');
const setSearchResult = async (searchString) => {
  searchBlock.textContent = await searchClient(searchString);
  return 'We found something for you';
};

export default () => {
  const searchString = document.getElementById('search').value.trim();

  if (!searchString) {
    return 'Nothing was found for your query ';
  }

  return setSearchResult(searchString);
};
