const routeForAllSpecializations = '/api/doctors/specializations/';
const routeForGetPatientDataByID = '/api/patients/me/';

/**
 * Отправляет GET-запрос на указанный route
 *
 * @param {string} route - маршрут для обращения к серверу
 * @returns {(function(): Promise<any|boolean|null|undefined>)|*}
 */

const getRequest = (route) => async () => {
  try {
    const response = await fetch(route);

    const result = await response.json();
    if (response.status === 302) {
      window.location = result.url;
    }

    if (response.ok) {
      return result;
    }

    return false;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAllSpecializations = getRequest(routeForAllSpecializations);
const getPatientDataByID = getRequest(routeForGetPatientDataByID);
export { getAllSpecializations, getPatientDataByID };
