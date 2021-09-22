const routeForGetCurrentPatient = '/api/patients/waiting/current';

/**
 * Отправляет GET-запрос на сервер
 *
 * @param {string} route - маршрут для обращения к серверу
 * @returns {(function(): Promise<any|null|undefined>)|*}
 */

const getCurrentPatient = (route) => async () => {
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

export default getCurrentPatient(routeForGetCurrentPatient);
