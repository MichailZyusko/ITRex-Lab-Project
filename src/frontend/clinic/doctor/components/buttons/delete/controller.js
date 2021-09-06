/* eslint-disable no-restricted-globals */

import deleteResolution from './services.js';

const resolutionSelector = document.getElementById('resolutionSelector');
const searchResult = document.getElementById('searchResult');
const clearInputs = () => {
  resolutionSelector.value = '';
  searchResult.innerText = '';
};

export default async () => {
  const resolution = resolutionSelector.value.trim();
  const confirmed = confirm('Are you sure about this? The data cannot be recovered later');

  if (!(resolution && confirmed)) {
    return null;
  }

  clearInputs();

  const selectedOption = document.getElementById(resolution);
  const { resolutionID } = selectedOption;

  const result = await deleteResolution(resolutionID);
  return result;
};
