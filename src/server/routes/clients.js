import { Router } from 'express';
import clients from '../../controllers/index.js';
import {
  isExist, isValid, DTO, errorHandler,
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
  .post(DTO, isValid, isExist, addClient);

router.route('/nextClient')
  .get(nextClient);

router.route('/:id')
  .get(DTO, searchClient)
  .delete(deleteClient)
  .patch(setDiagnose);

router.use(errorHandler);

export default router;
