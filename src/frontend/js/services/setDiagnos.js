import { getNextClient, setDiagnose } from '../methods/index.js';

export default async (timeToLive, resolutionText) => {
  const { currentClient } = await getNextClient();

  if (currentClient) {
    // TODO вот тут надо подумать будет ли эта штука потом
    const actionStatus = currentClient.diagnos ? 'update' : 'added';

    currentClient.diagnos = resolutionText;
    currentClient.TTL = new Date(new Date().getTime() + timeToLive);

    if (await setDiagnose(currentClient.clientID, {
      value: currentClient.diagnos,
      TTL: currentClient.TTL,
    })) {
      return `Resolution successfully ${actionStatus}`;
    }

    return 'Couldn\'t add a resolution :(';
  }

  return 'You don\'t have a patient to see right now.';
};
