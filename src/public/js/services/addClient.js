/* eslint-disable no-param-reassign */

import { addClientToIncomingQueue } from '../methods/POST.js';
import { getIncomingQueue } from '../methods/GET.js';

const queueStatus = document.getElementById('queueStatus');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const updateInformation = (clients) => {
  queueStatus.textContent = `${clients.length} people before you`;
  firstName.textContent = clients[0].firstName;
  lastName.textContent = clients[0].lastName;
};

// Добавляет нового пациента в очередь
export default async (ws, formData = null, randomUser = null) => {
  try {
    // TODO Есть вопросик. Мне кажется это мб уязвимым местом.
    // TODO Если у нас придет одновременно 2 запроса от кслиента и случайного пользователя.
    // TODO Если мы оставим на 2 if, а заменим это на if/else.
    // TODO Может случиться что-нибудь страшное(необработка клиента)?

    // const id = +localStorage.getItem('id');

    // Можно возвращать первое тру значение и делать запрос
    if (randomUser) {
      // randomUser.id = id;
      await addClientToIncomingQueue(randomUser);
    }
    if (formData) {
      // formData.id = id;
      await addClientToIncomingQueue(formData);
    }

    // localStorage.setItem('id', `${id + 1}`);
    ws.send('client');

    updateInformation(await getIncomingQueue());
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
