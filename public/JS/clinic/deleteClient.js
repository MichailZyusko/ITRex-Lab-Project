/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/extensions */
/* eslint-disable no-alert */

import setQueue from '../general/setQueue.js';

const search = document.getElementById('search');
const searchResult = document.getElementById('searchResult');

// Удаляет пациента по его имени
export default async function deleteClient() {
  const searchString = search.value.trim();

  // Проверка на исключение
  if (searchString && confirm('Are you sure about this? The data cannot be recovered later')) {
    const deletingResult = await setQueue({ search: searchString }, 'output/deleteElement');

    if (deletingResult === 'Nothing was found for your query') {
      return 'Something went wrong';
    }

    search.value = '';
    searchResult.innerText = '';
    return 'This client was successfuly delete';
  }
}
