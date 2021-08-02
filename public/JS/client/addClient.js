/* eslint-disable import/extensions */
// TODO Поясни пожалуйста почему он просит ставить расширени .js в конец импорта

import Client from '../src/clientClass.js';

// Добавляет нового пациента в очередь
export default function addClient(ws) {
  const input = document.getElementById('nameInput');
  const [firstName, lastName] = input.value.split(' ');

  // Проверка на исключения
  if (firstName !== '' && lastName !== '') {
    ws.send('client');

    const array = JSON.parse(localStorage.getItem('arr'));
    array.push(new Client(firstName, lastName));
    localStorage.setItem('arr', JSON.stringify(array));

    // Обновляем данные
    document.getElementById('queueStatus').innerText = `${array.length - 1} people before you`;
    document.getElementById('firstName').innerText = array[0].firstName;
    document.getElementById('lastName').innerText = array[0].lastName;
  }
}
