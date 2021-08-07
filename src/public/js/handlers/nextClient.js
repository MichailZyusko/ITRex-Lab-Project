import { nextClient } from '../services/index.js';
import getQueue from '../methods/GET.js';

localStorage.setItem('currentClient', JSON.stringify(null));

export default async (ws) => {
  ws.send('clinic');

  const currentClient = JSON.parse(localStorage.getItem('currentClient'));

  return nextClient(currentClient, await getQueue('incomingQueue'));
};
