const routeForGetAllPatient = '/api/patients/';

/**
 * Отправляет GET-запрос на сервер
 *
 * @param {string} route - Маршрут для общения с сервером
 * @returns {(function(*): Promise<any|boolean|null|undefined>)|*}
 */

const findAllPatientLikeValue = (route) => async (search) => {
  try {
    const response = await fetch(`${route}?search=${search}`);
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

export default findAllPatientLikeValue(routeForGetAllPatient);
