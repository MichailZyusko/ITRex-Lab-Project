const express = require('express');

const router = express.Router();

const {
  addClient, getOutgoingQueue, removeClient, searchClient,
} = require('../../controllers/outgoingQueueControllers.js');

// TODO Тут у меня к тебе есть один вопросик.Как правильно поступить? У меня есть 4 типа запроса
// TODO на получения массива исходящей очереди(GET), добавление клиента(POST), удаление(DELETE).
// TODO и поиск. Вопрос стоит в том, какой метод лучше использовать для поиска элементов.
// TODO Желательно чтобы он имел в себе body и я бы хотел, чтобы он был
// TODO  на том же маршруте (outgoingQueue) и добавлялся к методу router.route('/') описанному ниже

// TODO Сразу еще один вопрос оставлю. Как использовать на node ES6 синтаксис при импорте/экспорте
// TODO у меня VS code подсказывает что это устарело, но когда я исправляю, то выдает ошибки

router.route('/outgoingQueue')
  .get(getOutgoingQueue)
  .post(addClient)
  .delete(removeClient);

router.post('/output/searchClient', searchClient);

module.exports = router;
