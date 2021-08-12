import { getNextClient } from '../methods/index.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const updateInformation = (currentClient, nextClients, queueLength) => {
  queueStatus.textContent = `${queueLength} people before you`;
  firstName.textContent = currentClient.firstName;
  lastName.textContent = currentClient.lastName;
};

export default async () => {
  const { currentClient, nextClients, queueLength } = await getNextClient();

  if (!queueLength) {
    return null;
  }

  updateInformation(currentClient, nextClients, queueLength);

  return null;
};
