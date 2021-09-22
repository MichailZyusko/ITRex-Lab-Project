const routeQueueUp = '/api/patients/me/';

const reqObject = (data) => ({
  method: 'POST',
  body: JSON.stringify({ recordTime: data }),
  headers: {
    'Content-Type': 'application/json',
    charset: 'UTF-8',
  },
});

/**
 * Отправляет POST-запрос на сервер с информацией пациента и временем записи
 *
 * @param {string} route - маршрут для обращения к серверу
 * @returns {(function(*=, *=): Promise<boolean|any|undefined>)|*}
 */

const queueUp = (route) => async (doctorID, recordTime) => {
  try {
    if (!(doctorID && recordTime)) {
      alert('Choose doctor');
      return false;
    }

    const response = await fetch(`${route}?doctorID=${doctorID}`, reqObject(recordTime));
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

export default queueUp(routeQueueUp);
