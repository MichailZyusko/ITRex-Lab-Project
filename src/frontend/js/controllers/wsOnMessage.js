import { getNextClient } from '../methods/index.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

const clientMessage = async ({ data }) => {
  if (data !== 'clinic') {
    return null;
  }

  const { currentClient, queueLength } = await getNextClient();

  if (queueLength > 1) {
    firstName.textContent = currentClient.firstName;
    lastName.textContent = currentClient.lastName;
    queueStatus.innerText = `${queueLength} people before you`;
  } else if (queueLength === 1) {
    firstName.textContent = 'Wait to be called';
    lastName.textContent = '';
    queueStatus.innerText = `${queueLength - 1} people before you`;
  }

  return null;
};

const clinicMessage = async ({ data }) => {
  if (data !== 'client') {
    return null;
  }

  const { currentClient, queueLength } = await getNextClient();

  if (queueLength) {
    firstName.textContent = currentClient.firstName;
    lastName.textContent = currentClient.lastName;
  } else {
    firstName.textContent = 'You don\'t have new patient\'s';
    lastName.textContent = '';
  }

  queueStatus.textContent = `${queueLength} person in line`;

  return null;
};

export { clientMessage, clinicMessage };
