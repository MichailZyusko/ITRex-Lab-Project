import { Router } from 'express';
import clients from '../../controllers/index.js';
import {
  DTO, errorHandler, isExist, isValidData, isValidDiagnose,
} from '../../middlewares/index.js';

const {
  addClient,
  deleteClient,
  getQueue,
  searchClient,
  setDiagnose,
  nextClient,
} = clients;

const router = Router();

router.route('/')
  .get(getQueue)
  .post(DTO, isValidData, isExist, addClient);

router.route('/nextClient')
  .get(nextClient);

router.route('/:id')
  .get(DTO, searchClient)
  .delete(DTO, deleteClient)
  .patch(DTO, isValidDiagnose, setDiagnose); // Добавить isExist

router.use(errorHandler);

export default router;
