/* eslint-disable consistent-return */
/* eslint-disable import/extensions */

import getQueue from './getQueue.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

export default async () => {
  const clients = await getQueue('inputQueue');

  if (!clients.length) { return null; }

  queueStatus.textContent = `${clients.length} people before you`;
  firstName.textContent = clients[0].firstName;
  lastName.textContent = clients[0].lastName;
};
