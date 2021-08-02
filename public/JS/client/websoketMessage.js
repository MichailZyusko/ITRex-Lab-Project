export default (res) => {
  // Смотрим с какого сайта пришел event и изменяем количество человек в очереди
  // и следующего пациента при приеме врача
  if (res.data === 'clinic') {
    const array = JSON.parse(localStorage.getItem('arr'));

    const queueStatus = document.getElementById('queueStatus');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');

    // Меняем текст подписей, соответсвующих реальности
    if (array.length > 0) {
      try {
        firstName.innerText = array[1].firstName;
        lastName.innerText = array[1].lastName;

        queueStatus.innerText = `${array.length - 1} people before you`;
      } catch (error) {
        firstName.innerText = array[0].firstName;
        lastName.innerText = array[0].lastName;

        queueStatus.innerText = `${array.length} people before you`;
      }
    } else {
      firstName.innerText = 'Wait to be called';
      lastName.innerText = '';

      queueStatus.innerText = '0 people before you';
    }
  }
};
