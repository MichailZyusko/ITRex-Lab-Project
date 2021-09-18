const URL = '/api/doctors/specializations/';

const getRequest = (route) => async (specializationID) => {
  try {
    const response = await fetch(`${route}${specializationID}`);
    const result = await response.json();

    if (response.status === 302) {
      window.location = result.url;
    }

    return response.ok ? result : false;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getRequest(URL);
