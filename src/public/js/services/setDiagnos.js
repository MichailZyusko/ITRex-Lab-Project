import { getCurrentClient } from '../methods/GET.js';
import { setCurrentClient } from '../methods/POST.js';

// Осуществляет запись результата осмотра врача в соответсвующее поле пациента
export default async (status, timeToLive, resolutionText) => {
  const currentClient = (await getCurrentClient()).value;

  if (currentClient) {
    const actionStatus = currentClient.resolution ? 'update' : 'added';

    currentClient.resolution = resolutionText;

    if (status) {
      currentClient.TTL = timeToLive;
    }

    await setCurrentClient({ value: currentClient });
    return `Resolution successfully ${actionStatus}`;
  }
  return 'You don\'t have a patient to see right now.';
};
