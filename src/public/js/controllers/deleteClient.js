/* eslint-disable no-restricted-globals */

import { deleteClient } from '../services/index.js';

const search = document.getElementById('search');
const searchResult = document.getElementById('searchResult');
const clearInputs = () => {
  search.value = '';
  searchResult.innerText = '';
};

export default async () => {
  const searchString = search.value.trim();

  // Проверка на исключение и даем согласие на удаление
  const confirmed = confirm('Are you sure about this? The data cannot be recovered later');
  if (!(searchString && confirmed)) {
    return null;
  }

  clearInputs();

  const result = await deleteClient(searchString);
  return result;
};
