const routeForDeleteResolution = '/api/resolutions';

const reqObject = () => ({
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    charset: 'UTF-8',
  },
});

/**
 * Отправляет DELETE-запрос на сервер
 *
 * @param {string} route - маршрут для обращения к серверу
 * @returns {(function(*): Promise<boolean|undefined>)|*}
 */

const makeDELETERequest = (route) => async (resolutionID) => {
  try {
    const response = await fetch(`${route}/${resolutionID}`, reqObject());

    if (!response.ok) {
      const { message } = await response.json();

      alert(`Error: ${message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export default makeDELETERequest(routeForDeleteResolution);
