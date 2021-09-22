const getAllResolutions = '/api/resolutions/patient/';

/**
 * Отправляет GET-запрос на сервер
 *
 * @param {string} route - маршрут для запросов
 * @returns {(function(*): Promise<{result: any, ok: boolean}|{result: any, ok: boolean}|null|undefined>)|*}
 */

const getRequest = (route) => async (patientID) => {
  try {
    const response = await fetch(`${route}${patientID}`);
    const result = await response.json();

    if (response.status === 302) {
      window.location = result.url;
    }

    return response.ok ? { result, ok: true } : { result, ok: false };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getRequest(getAllResolutions);
