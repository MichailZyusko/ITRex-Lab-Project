/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
/* eslint-disable import/extensions */

import getQueue from '../general/getQueue.js';
import setQueue from '../general/setQueue.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const diagnosText = document.getElementById('diagnosText');
const form = document.querySelector('form');
const profileImg = document.getElementById('profileImg');

let currentClient = null;

function changeText(clients) {
  if (clients.length !== 0) {
    queueStatus.textContent = `${clients.length - 1} person in line`;

    if (clients.length > 1) {
      firstName.textContent = clients[1].firstName;
      lastName.textContent = clients[1].lastName;
    } else if (clients.length === 1) {
      firstName.textContent = 'You don\'t have new pacients';
      lastName.textContent = '';
    }

    for (const [key, value] of Object.entries(clients[0])) {
      if (key !== 'resolution' && key !== 'picture' && key !== 'TTL') {
        form.elements[key].value = value;
      }
    }

    profileImg.src = clients[0].picture
      ? clients[0].picture
      : '../../html/src/img/profilePicture.svg';

    return null;
  }

  Array.from(form).forEach((element) => element.value = '');

  firstName.textContent = 'You don\'t have new pacients';
  lastName.textContent = '';
  profileImg.src = '../../html/src/img/profilePicture.svg';
  diagnosText.value = '';

  return null;
}

async function nextPerson(ws) {
  // Тригерем событие клика по кнопке для изменения состояния на другом сайте
  ws.send('clinic');

  const clients = await getQueue('inputQueue');

  if (currentClient) {
    if (currentClient.resolution) {
      await setQueue(currentClient, 'output/addClient');

      if (clients.length) {
        currentClient = clients[0];
        await setQueue(currentClient, 'input/removeClient');
        diagnosText.value = '';
      } else {
        currentClient = null;
      }

      changeText(clients);
    } else {
      return 'Please, fill resolution for this client';
    }
  } if (clients.length) {
    currentClient = clients[0];
    changeText(clients);
    await setQueue(currentClient, 'input/removeClient');
    return 'The client is expecting you';
  }
  return 'You don\'t have new pacients';
}

export { nextPerson, currentClient };
