import { addClient, getNextClient } from '../methods/index.js';
import updateInformation from '../helper/updateInformation.js';

export default async (ws, formData = null, randomUser = null) => {
  try {
    if (await addClient(randomUser || formData)) {
      ws.send('client');
      const { currentClient, nextClients, queueLength } = await getNextClient();

      updateInformation(currentClient, nextClients, queueLength);
      return true;
    }

    // TODO Добавить алерт с уведомлением о том что клиент был кспешно добавлен
    alert('Failed to add a client :(');
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
