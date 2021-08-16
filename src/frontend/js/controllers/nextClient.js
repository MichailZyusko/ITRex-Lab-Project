import { nextClients } from '../services/index.js';
import { getNextClient } from '../methods/index.js';

export default async (ws) => {
  ws.send('clinic');

  const { currentClient, nextClient, queueLength } = await getNextClient();

  return nextClients(currentClient, nextClient, queueLength);
};
