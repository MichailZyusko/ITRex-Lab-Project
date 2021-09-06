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

const setSearchResult = async (lastName, firstName, email) => {
  const response = await searchChangeServices(lastName, firstName, email);
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
  const [lastName, firstName, email] = document.getElementById('search').value.trim().split(' | ');

  if (!(lastName && firstName && email)) {
    return 'Nothing was found for your query ';
  }

  return setSearchResult(lastName, firstName, email);
};
