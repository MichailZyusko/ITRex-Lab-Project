// Ищет пациента и выводит его информацию в формате JSON
export default function searchClient(id) {
  const searchString = document.getElementById(id).value.trim();

  // Проверяем исключения
  if (searchString !== '') {
    const result = JSON.parse(localStorage.getItem('result'));

    // Ищем пациента с таким же именем, как было введено
    const client = result.find((item) => item.fullName === searchString);
    const searchBlock = document.getElementById('searchBlock');

    // Если найдено, то выводим результат, если нет, то выводим соответ ответ
    if (client) {
      searchBlock.innerText = JSON.stringify(client, null, 4);
    } else {
      searchBlock.innerText = 'Nothing was found for your query';
    }
  }
}
