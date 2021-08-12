/* eslint-disable no-param-reassign */
import { addClient, getNextClient } from '../methods/index.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

// TODO Вынести в отдельный метод, так как часто используется
const updateInformation = (currentClient, nextClients, queueLength) => {
  queueStatus.textContent = `${queueLength} people before you`;
  firstName.textContent = currentClient.firstName;
  lastName.textContent = currentClient.lastName;
};

// Добавляет нового пациента в очередь
export default async (ws, formData = null, randomUser = null) => {
  try {
    await addClient(randomUser || formData);
    ws.send('client');
    const { currentClient, nextClients, queueLength } = await getNextClient();

    updateInformation(currentClient, nextClients, queueLength);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
