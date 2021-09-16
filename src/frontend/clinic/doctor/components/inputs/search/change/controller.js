import searchChangeServices from './services.js';

const addOption = (resolutionID, date, resolutionText, status) => {
  const option = document.createElement('option');
  const datalist = document.getElementById('resolutions');

  option.value = `${date.slice(0, 19).replace('T', ' ')} | ${resolutionText} | ${status}`;
  // option.label = `${date.slice(0, 19).replace('T', ' ')} | ${resolutionText} | ${status}`;
  // option.value = patientID;
  option.resolutionID = resolutionID;
  option.id = `${date.slice(0, 19).replace('T', ' ')} | ${resolutionText} | ${status}`;

  datalist.appendChild(option);
};

const setSearchResult = async (patientID) => {
  const response = await searchChangeServices(patientID);
  try {
    response.forEach((element) => {
      const {
        resolutionID, date, resolutionText, status,
      } = element;
      addOption(resolutionID, date, resolutionText, status);
    });

    return 'We found something for you';
  } catch (error) {
    return response;
  }
};

export default () => {
  const searchValue = document.getElementById('search').value.trim();
  const optionWithID = document.getElementById(searchValue);
  const { patientID } = optionWithID;

  if (!patientID) {
    return 'Nothing was found for your query ';
  }

  return setSearchResult(patientID);
};
