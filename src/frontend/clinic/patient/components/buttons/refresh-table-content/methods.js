const routeForGetAllResolutions = '/api/resolutions/patient/false';

/**
 * Отправляет GET-запрос на сервер
 *
 * @param {string} route - маршрут для обращения к серверу
 * @returns {(function(): Promise<boolean|any|null|undefined>)|*}
 */

const getAllResolutions = (route) => async () => {
  try {
    const response = await fetch(route);
    const result = await response.json();

    if (response.status === 302) {
      window.location = result.url;
    }

    if (!response.ok) {
      const { result: message } = result;

      alert(`Error ${message}`);
      return false;
    }
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// TODO Придумать что-нибудь с роутом так как нельзя просто передавать false
export default getAllResolutions(routeForGetAllResolutions);
