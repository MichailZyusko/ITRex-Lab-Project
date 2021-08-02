/* eslint-disable no-alert */

// Осуществляет запись результата осмотра врача в соответсвующее поле пациента
export default function setResolutionToClient() {
  const resolutionText = document.getElementById('resolutionText');
  if (resolutionText.value !== '') {
    const array = JSON.parse(localStorage.getItem('arr'));
    if (array.length !== 0) {
      const currentClient = array[0];

      // ОБрабатываем возможные ошибки
      if (currentClient.resolution !== '') {
        alert('Resolution successfully update');
      } else {
        alert('Resolution successfully added');
      }

      currentClient.resolution = resolutionText.value;
      localStorage.setItem('arr', JSON.stringify(array));
    } else {
      alert('You don\'t have a patient to see right now.');
    }
  } else {
    alert('Please, fill "set appointment resolution" field');
  }
}
