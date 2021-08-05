/* eslint-disable consistent-return */
/* eslint-disable import/extensions */

import setQueue from './setQueue.js';

const searchBlock = document.getElementById('searchResult');

// Ищет пациента и выводит его информацию в формате JSON
export default async function searchClient(ID) {
  const searchString = document.getElementById(ID).value.trim();

  // Проверяем исключения
  if (!searchString) { return null; }

  const searchResult = await setQueue({ search: searchString }, 'output/searchClient');

  searchBlock.textContent = JSON.stringify(searchResult, null, 4);
}
