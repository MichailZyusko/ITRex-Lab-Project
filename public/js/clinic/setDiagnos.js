/* eslint-disable import/extensions */

import { currentClient } from './nextPerson.js';

// Осуществляет запись результата осмотра врача в соответсвующее поле пациента
export default async function setResolutionToClient() {
  const resolutionText = document.getElementById('diagnosText');
  if (!resolutionText.value) return 'Please, fill "set diagnos" field';

  if (currentClient) {
    let actionStatus = '';

    actionStatus = currentClient.resolution ? 'update' : 'added';
    currentClient.resolution = resolutionText.value;

    return `Resolution successfully ${actionStatus}`;
  }
  return 'You don\'t have a patient to see right now.';
}
