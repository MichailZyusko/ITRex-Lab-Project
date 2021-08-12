import { getNextClient, setDiagnose } from '../methods/index.js';

export default async (status, timeToLive, resolutionText) => {
  const { currentClient } = await getNextClient();

  if (currentClient) {
    const actionStatus = currentClient.diagnos ? 'update' : 'added';

    currentClient.diagnos = resolutionText;

    if (status) {
      currentClient.TTL = timeToLive;
    }

    await setDiagnose(currentClient.ID, { value: currentClient.diagnos, TTL: currentClient.TTL });
    return `Resolution successfully ${actionStatus}`;
  }

  return 'You don\'t have a patient to see right now.';
};
