import getQueue from '../methods/GET.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const updateInformation = (clients) => {
  queueStatus.textContent = `${clients.length} people before you`;
  firstName.textContent = clients[0].firstName;
  lastName.textContent = clients[0].lastName;
};

export default async () => {
  const clients = await getQueue('incomingQueue');

  if (!clients.length) {
    return null;
  }

  updateInformation(clients);

  return null;
};
