const routeForSetResolution = '/api/resolutions/patient';
const routeForGetCurrentPatient = '/api/patients/waiting/current';
const routeForDelCurrentPatient = '/api/patients/waiting/current';

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

/**
 * Удаляет первого пациента в очереди
 *
 * @param {string} route - маршрут для обращения к серверу
 * @returns {(function(): Promise<boolean|any|undefined>)|*}
 */

const DELETERequest = (route) => async () => {
  try {
    const response = await fetch(`${route}`, deleteReqObject());
    const result = await response.json();

    if (response.status === 302) {
      window.location = result.url;
    }

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

/**
 * Задает резолюцию текущему пациенту
 *
 * @param {string} route - маршрут для обращения к серверу
 * @returns {(function(): Promise<boolean|any|undefined>)|*}
 */

const setResolutionRequest = (route) => async (patientID = null, data = null) => {
  if (!data) {
    return false;
  }

  try {
    const response = await fetch(`${route}/${patientID}`, postReqObject(data));
    const result = await response.json();

    if (response.status === 302) {
      window.location = result.url;
    }

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

/**
 * Получает текущего пациента из очереди
 *
 * @param {string} route - маршрут для обращения к серверу
 * @returns {(function(): Promise<boolean|any|undefined>)|*}
 */

const makeGERequest = (route) => async () => {
  try {
    const response = await fetch(route);
    const result = await response.json();

    if (response.status === 302) {
      window.location = result.url;
    }

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCurrentPatient = makeGERequest(routeForGetCurrentPatient);
const setResolution = setResolutionRequest(routeForSetResolution);
const deletePatient = DELETERequest(routeForDelCurrentPatient);

export { setResolution, deletePatient, getCurrentPatient };
