import resolutionChangeServices from './services.js';

const searchResult = document.getElementById('searchResult');

const setSearchResult = async (resolutionID) => {
  const response = await resolutionChangeServices(resolutionID);
  try {
    searchResult.innerText = JSON.stringify(response, null, 2);
  } catch (error) {
    console.error(error);
  }
};

export default (event) => {
  const selectedOption = document.getElementById(event.target.value);
  const { resolutionID } = selectedOption;

  return setSearchResult(resolutionID);
};
