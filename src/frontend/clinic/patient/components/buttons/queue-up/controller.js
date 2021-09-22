import queueUp from './methods.js';

const dateTimeInput = document.getElementById('datetime');

/**
 * Добавляет пользователя в очередь
 *
 * @returns {Promise<boolean>}
 */

export default async () => {
  try {
    const doctor = document.getElementById('doctorName').value.trim();
    const option = document.getElementById(doctor);
    const { doctorID } = option;
    const { positionInQueue } = await queueUp(doctorID, Date.parse(dateTimeInput.value));

    if (positionInQueue) {
      document.getElementById('queueStatus').innerText = `${positionInQueue} people before You`;
      alert('Client successfully add :)');
      return true;
    }

    alert('Failed to add a client :(');
    return false;
  } catch (error) {
    console.log(error);
  }
};
