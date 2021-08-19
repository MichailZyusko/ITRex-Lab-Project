import { getNextClient } from '../methods/index.js';
import updateInformation from '../helper/updateInformation.js';

export default async () => {
  const { currentClient, nextClients, queueLength } = await getNextClient();

  if (!queueLength) {
    return null;
  }

  updateInformation(currentClient, nextClients, queueLength);

  return null;
};
