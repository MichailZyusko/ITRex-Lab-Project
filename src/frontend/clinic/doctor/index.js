/* eslint-disable no-return-await */

import {
  reolutionInputChange, searchInputChange, searchInputInput,
  deleteButtonClick, nextButtonClick, setResolutionClick,
} from './components/index.js';

const nextButton = document.getElementById('nextButton');
const setResolutionButton = document.getElementById('setDiagnose');
const searchInput = document.getElementById('search');
const deleteButton = document.getElementById('deleteButton');
const resolutionSelector = document.getElementById('resolutionSelector');

resolutionSelector.addEventListener('change', reolutionInputChange);
deleteButton.addEventListener('click', async () => alert(await deleteButtonClick()));
setResolutionButton.addEventListener('click', async () => alert(await setResolutionClick()));
nextButton.addEventListener('click', async () => alert(await nextButtonClick()));
searchInput.addEventListener('change', async () => alert(await searchInputChange()));
searchInput.addEventListener('input', async () => await searchInputInput());
