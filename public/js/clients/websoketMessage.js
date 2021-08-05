/* eslint-disable consistent-return */
/* eslint-disable import/extensions */

import getQueue from '../general/getQueue.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

export default async (res) => {
  // Смотрим с какого сайта пришел event и изменяем количество человек в очереди
  // и следующего пациента при приеме врача
  if (res.data !== 'clinic') { return null; }

  const clients = await getQueue('inputQueue');

  // Меняем текст подписей, соответсвующих реальности
  if (clients.length > 1) {
    firstName.textContent = clients[0].firstName;
    lastName.textContent = clients[0].lastName;
    queueStatus.innerText = `${clients.length} people before you`;
  } else if (clients.length === 1) {
    firstName.textContent = 'Wait to be called';
    lastName.textContent = '';
    queueStatus.innerText = `${clients.length - 1} people before you`;
  }
};
