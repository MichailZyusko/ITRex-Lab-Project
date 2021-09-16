import {
  searchInputChange, searchInputInput,
  nextButtonClick, setResolutionClick,
} from './components/index.js';

const nextButton = document.getElementById('nextButton');
const setResolutionButton = document.getElementById('setDiagnose');
const searchInput = document.getElementById('search');

setResolutionButton.addEventListener('click', async () => alert(await setResolutionClick()));
nextButton.addEventListener('click', async () => alert(await nextButtonClick()));
searchInput.addEventListener('change', async () => alert(await searchInputChange()));
searchInput.addEventListener('input', async () => {
  await searchInputInput();
});
