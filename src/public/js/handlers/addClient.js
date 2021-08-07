import getQueue from '../methods/GET.js';
import { addClient } from '../services/index.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const form = document.querySelector('form');
const updateInformation = (clients) => {
  queueStatus.textContent = `${clients.length} people before you`;
  firstName.textContent = clients[0].firstName;
  lastName.textContent = clients[0].lastName;
};

// Добавляет нового пациента в очередь
export default async (ws) => {
  const data = Object.fromEntries(new FormData(form).entries());

  addClient(ws, data, null);
  updateInformation(await getQueue('incomingQueue'));

  return null;
};
