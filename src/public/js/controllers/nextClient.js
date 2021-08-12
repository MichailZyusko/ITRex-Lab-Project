import { nextClient } from '../services/index.js';
import { getNextClient } from '../methods/index.js';

export default async (ws) => {
  ws.send('clinic');

  const { currentClient, nextClients, queueLength } = await getNextClient();

  return nextClient(currentClient, nextClients, queueLength);
};
