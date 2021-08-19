/* eslint-disable no-param-reassign */
import { addClient, getNextClient } from '../methods/index.js';
import updateInformation from '../helper/updateInformation.js';

// Добавляет нового пациента в очередь
export default async (ws, formData = null, randomUser = null) => {
  try {
    const { code, message } = await addClient(randomUser || formData);
    if (code > 300) {
      alert(`Error: ${message}`);
    }

    ws.send('client');
    const { currentClient, nextClients, queueLength } = await getNextClient();

    updateInformation(currentClient, nextClients, queueLength);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
