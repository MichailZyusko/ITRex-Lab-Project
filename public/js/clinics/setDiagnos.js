/* eslint-disable import/extensions */

import { currentClient } from './nextPerson.js';

const TTL = document.getElementById('TTL');
const time = document.getElementById('time');

// Осуществляет запись результата осмотра врача в соответсвующее поле пациента
export default async function setResolutionToClient() {
  const timeToLive = time.value;
  const resolutionText = document.getElementById('diagnosText');
  if (!resolutionText.value) {
    return 'Please, fill "set diagnos" field';
  }

  if (currentClient) {
    let actionStatus = '';

    actionStatus = currentClient.resolution ? 'update' : 'added';
    currentClient.resolution = resolutionText.value;

    if (TTL.checked) {
      currentClient.TTL = +timeToLive;
    }

    return `Resolution successfully ${actionStatus}`;
  }
  return 'You don\'t have a patient to see right now.';
}
