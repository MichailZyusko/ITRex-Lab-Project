/* eslint-disable no-alert */

function changeText(array) {
  if (array.length !== 0) {
    const queueStatus = document.getElementById('queueStatus');
    queueStatus.innerText = `${array.length - 1} person in line`;

    const currentPacient = array[0];

    document.getElementById('firstName').innerText = currentPacient.firstName;
    document.getElementById('lastName').innerText = currentPacient.lastName;

    return currentPacient;
  }

  document.getElementById('firstName').innerText = 'You don\'t have new pacients';
  document.getElementById('lastName').innerText = '';
  document.getElementById('resolutionText').value = '';
  return null;
}

export default function nextPerson(ws) {
  // Тригерем событие клика по кнопке для изменения состояния на другом сайте
  ws.send('clinic');

  const array = JSON.parse(localStorage.getItem('arr'));

  // Проверка на первого пациента
  if (document.getElementById('firstName').innerText === 'You don\'t have new pacients') {
    changeText(array);
  } else {
    const result = JSON.parse(localStorage.getItem('result'));

    if (array.length > 0) {
      const currentPacient = changeText(array);
      // Только если есть результат осмотра, то тогда вызываем следующего
      if (currentPacient.resolution !== '') {
        result.push(array.shift());

        localStorage.setItem('arr', JSON.stringify(array));
        localStorage.setItem('result', JSON.stringify(result));

        changeText(array);
        document.getElementById('resolutionText').value = '';
      } else {
        alert('Please, fill resolution for this client');
      }
    }
  }
}
