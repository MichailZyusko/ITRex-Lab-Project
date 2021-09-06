const deleteReqObject = () => ({
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    charset: 'UTF-8',
  },
});

const postReqObject = (data) => ({
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
    charset: 'UTF-8',
  },
});

const DELETERequest = (route) => async () => {
  try {
    const response = await fetch(`${route}`, deleteReqObject());
    const result = await response.json();
    if (!response.ok) {
      const { message } = result;

      alert(`Error: ${message}`);
      return false;
    }

    return result;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

const setResolutionRequest = (route) => async (ID = null, data = null) => {
  if (!data) {
    return false;
  }

  try {
    const response = await fetch(`${route}?id=${ID}`, postReqObject(data));
    const result = await response.json();

    if (!response.ok) {
      const { message } = result;

      alert(`Error: ${message}`);
      return false;
    }

    return result;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

const makeGERequest = (route) => async () => {
  try {
    const response = await fetch(route);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCurrentPatient = makeGERequest('/api/clients/currentPatient');
const setResolution = setResolutionRequest('/api/resolutions');
const deletePatient = DELETERequest('/api/clients/currentPatient');

export { setResolution, deletePatient, getCurrentPatient };
