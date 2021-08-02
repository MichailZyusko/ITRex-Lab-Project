export default (res) => {
  // Смотрим с какого сайта пришел event и изменяем количество человек в очереди при новой записи
  if (res.data === 'client') {
    const array = JSON.parse(localStorage.getItem('arr'));
    const queueStatus = document.getElementById('queueStatus');

    queueStatus.innerText = `${array.length} person in line`;
  }
};
