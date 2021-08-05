/* eslint-disable import/extensions */

import getQueue from '../general/getQueue.js';
import setQueue from '../general/setQueue.js';

const queueStatus = document.getElementById('queueStatus');
const firstNameText = document.getElementById('firstName');
const lastNameText = document.getElementById('lastName');
const form = document.querySelector('form');
const destructuring = (obj) => {
  const {
    gender,
    name: {
      first: firstName,
      last: lastName,
    },
    location: {
      street: {
        number: streetNumber,
        name: streetName,
      },
      city,
      country,
    },
    email,
    dob: {
      age: fullAge,
    },
    phone: phoneNumber,
    picture: {
      large: picture,
    },
  } = obj;

  return {
    firstName,
    lastName,
    gender,
    fullAge,
    country,
    address: `${city}, ${streetName} street ${streetNumber}`,
    email,
    phoneNumber,
    picture,
  };
};

// Добавляет нового пациента в очередь
export default async function addClient(ws, randomUser) {
  const data = Object.fromEntries(new FormData(form).entries());

  // Проверка на исключения
  if (randomUser) {
    ws.send('client');
    const randUser = destructuring(randomUser);
    await setQueue(randUser, 'input/addClient');
  } else if (data) {
    ws.send('client');
    await setQueue(data, 'input/addClient');
  }

  const clients = await getQueue('inputQueue');

  // Обновляем данные
  queueStatus.textContent = `${clients.length} people before you`;
  firstNameText.textContent = clients[0].firstName;
  lastNameText.textContent = clients[0].lastName;

  return null;
}
