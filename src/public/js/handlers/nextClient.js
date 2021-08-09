import { nextClient } from '../services/index.js';
import { getIncomingQueue, getCurrentClient } from '../methods/GET.js';

export default async (ws) => {
  ws.send('clinic');

  const currentClient = (await getCurrentClient()).value;

  return nextClient(currentClient, await getIncomingQueue());
};
