/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */

import setQueue from '../methods/POST.js';
import deleteClient from '../methods/DELETE.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const diagnosText = document.getElementById('diagnosText');
const form = document.querySelector('form');
const profileImg = document.getElementById('profileImg');

const changeText = (clients) => {
  if (clients.length) {
    queueStatus.textContent = `${clients.length - 1} person in line`;

    if (clients.length > 1) {
      firstName.textContent = clients[1].firstName;
      lastName.textContent = clients[1].lastName;
    } else if (clients.length === 1) {
      firstName.textContent = 'You don\'t have new pacients';
      lastName.textContent = '';
    }

    Object.entries(clients[0]).forEach((item) => {
      const [key, value] = item;

      if (form.elements[key]) {
        form.elements[key].value = value;
      }
    });

    profileImg.src = clients[0].picture
      ? clients[0].picture
      : '../../html/src/img/profilePicture.svg';

    return null;
  }

  Array.from(form).forEach((element) => { element.value = ''; });

  firstName.textContent = 'You don\'t have new pacients';
  lastName.textContent = '';
  profileImg.src = '../../html/src/img/profilePicture.svg';
  diagnosText.value = '';

  return null;
};

const сontinueReceiving = async (currentClient, clients) => {
  localStorage.setItem('currentClient', JSON.stringify(clients[0]));
  await deleteClient(currentClient, 'incomingQueue');
  diagnosText.value = '';
};

const stopReceiving = () => localStorage.setItem('currentClient', JSON.stringify(null));

const checkClients = async (currentClient, clients) => {
  clients.length
    ? сontinueReceiving(currentClient, clients)
    : stopReceiving(currentClient, clients);

  await setQueue(currentClient, 'outgoingQueue');
  changeText(clients);

  return 'Call the next patient';
};

const checkDiagnos = async (currentClient, clients) => {
  if (currentClient.resolution) {
    return checkClients(currentClient, clients);
  }

  return 'Please, fill resolution for this client';
};

export default async (currentClient, clients) => {
  if (currentClient) {
    return checkDiagnos(currentClient, clients);
  }

  if (clients.length) {
    localStorage.setItem('currentClient', JSON.stringify(clients[0]));
    await deleteClient(clients[0], 'incomingQueue');
    changeText(clients);

    return 'The client is expecting you';
  }
  return 'You don\'t have new pacients';
};
