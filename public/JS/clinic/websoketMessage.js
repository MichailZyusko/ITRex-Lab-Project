/* eslint-disable consistent-return */
/* eslint-disable import/extensions */

import getQueue from '../general/getQueue.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

export default async (res) => {
  // Смотрим с какого сайта пришел event и изменяем количество человек в очереди при новой записи
  if (res.data !== 'client') return null;

  const clients = await getQueue('inputQueue');

  if (clients.length) {
    firstName.textContent = clients[0].firstName;
    lastName.textContent = clients[0].lastName;
  } else {
    firstName.textContent = 'You don\'t have new pacients';
    lastName.textContent = '';
  }

  queueStatus.textContent = `${clients.length} person in line`;
};
