// Осуществляет запись результата осмотра врача в соответсвующее поле пациента
export default async (status, timeToLive, resolutionText) => {
  const currentClient = JSON.parse(localStorage.getItem('currentClient'));

  if (currentClient) {
    const actionStatus = currentClient.resolution ? 'update' : 'added';

    currentClient.resolution = resolutionText;

    if (status) {
      currentClient.TTL = timeToLive;
    }

    localStorage.setItem('currentClient', JSON.stringify(currentClient));
    return `Resolution successfully ${actionStatus}`;
  }
  return 'You don\'t have a patient to see right now.';
};
