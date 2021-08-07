import setQueue from '../methods/POST.js';

// Добавляет нового пациента в очередь
export default async (ws, formData = null, randomUser = null) => {
  try {
    // TODO Есть вопросик. Мне кажется это мб уязвимым местом.
    // TODO Если у нас придет одновременно 2 запроса от кслиента и случайного пользователя.
    // TODO Если мы оставим на 2 if, а заменим это на if/else.
    // TODO Может случиться что-нибудь страшное(необработка клиента)?

    if (randomUser) {
      await setQueue(randomUser, 'incomingQueue');
    }
    if (formData) {
      await setQueue(formData, 'incomingQueue');
    }

    ws.send('client');

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
