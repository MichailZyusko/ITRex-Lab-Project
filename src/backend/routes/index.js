import { Router } from 'express';
import {
  addClientController, addClientDTO, addClientIsExistClient, addClientIsValidClientData,
} from '../requestProcessing/addClient/index.js';
import {
  searchClientController, searchClientDTO, searchClientIsExistID, searchClientIsValidID,
} from '../requestProcessing/searchClient/index.js';
import {
  deleteClientController, deleteClientDTO, deleteClientIsExistID, deleteClientIsValidID,
} from '../requestProcessing/deleteClient/index.js';
import {
  setDiagnoseController, setDiagnoseDTO, setDiagnoseIsExistID, setDiagnoseIsValidDiagnose,
} from '../requestProcessing/setDiagnose/index.js';
import getClientsController from '../requestProcessing/getClients/index.js';
import nextClientController from '../requestProcessing/nextClient/index.js';
import errorHandler from '../../errors/errorHandler.js';

const router = Router();

router.route('/')
  .get(getClientsController)
  .post(addClientDTO,
    addClientIsValidClientData,
    addClientIsExistClient,
    addClientController,
    errorHandler);

router.route('/nextClient')
  .get(nextClientController);

router.route('/:id')
  .get(searchClientDTO,
    searchClientIsValidID,
    searchClientIsExistID,
    searchClientController,
    errorHandler)
  .delete(deleteClientDTO,
    deleteClientIsValidID,
    deleteClientIsExistID,
    deleteClientController,
    errorHandler)
  .patch(setDiagnoseDTO,
    setDiagnoseIsValidDiagnose,
    setDiagnoseIsExistID,
    setDiagnoseController,
    errorHandler);

router.use(errorHandler);

// TODO Есть вопрос. Тот вариант с обработчиком ошибок, который ты кидал в дискорде.
// TODO Возможно я его не правильно использую, но у меня почему-то не доходит до него.
// TODO Встроенный обработчик Express обрабатывает ошибкураньше, чем мой обработчик ошибок.
// TODO Я пробовал вставлять егов разные места типо как на 48, 46, 41 ...строчках, но не сработал
// TODO ни один из этих вариантов. Я читал документацию на Express, там была какая-то особенность
// TODO c асинхронными функциями, но я так и не понял в чем у меня проблема (((.

// TODO С этим также связана проблема, по которой я не могу обрабатывать ошибки на стороне клиента.
// TODO То есть если я попробую добавить существующего клиента, я хочу чтобы эта ошибка
// TODO обрабатывалась на серевере и потом посылался на сторону клиента и там отображался в alert().

export default router;
