import express from 'express';

import { outgoingQueue } from '../../controllers/index.js';
import { isExist, isValid, sendResponse } from '../../middlewares/index.js';

const router = express.Router();

const {
  addClient, deleteClient, getQueue, searchClient,
} = outgoingQueue;

// TODO Тут у меня к тебе есть один вопросик.Как правильно поступить? У меня есть 4 типа запроса
// TODO на получения массива исходящей очереди(GET), добавление клиента(POST), удаление(DELETE).
// TODO и поиск. Вопрос стоит в том, какой метод лучше использовать для поиска элементов.
// TODO Желательно чтобы он имел в себе body и я бы хотел, чтобы он был
// TODO  на том же маршруте (outgoingQueue) и добавлялся к методу router.route('/') описанному ниже

// TODO Сразу еще один вопрос оставлю. Как использовать на node ES6 синтаксис при импорте/экспорте
// TODO у меня VS code подсказывает что это устарело, но когда я исправляю, то выдает ошибки

router.route('/')
  .get(getQueue)
  .post(isValid, isExist, addClient, sendResponse)
  .delete(deleteClient, sendResponse);

router.post('/searchClient', searchClient, sendResponse);

export default router;
