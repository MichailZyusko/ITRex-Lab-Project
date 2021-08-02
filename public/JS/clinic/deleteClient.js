// Удаляет пациента по его имени
export default function deleteClient() {
  const search = document.getElementById('deleteInput');
  const searchString = search.value.trim();

  // Проверка на исключение
  if (searchString !== '') {
    const result = JSON.parse(localStorage.getItem('result'));
    const searchBlock = document.getElementById('searchBlock');

    // Ищем пациента с таким же именем как было введено
    const deleteInsex = result.findIndex((item) => item.fullName === searchString);

    // Если нашли, то удаляем
    if (deleteInsex !== -1) {
      result.splice(deleteInsex, 1);
      localStorage.setItem('result', JSON.stringify(result));

      search.value = '';
      searchBlock.innerText = '';
    }
  }
}
