import { Router } from 'express';

import addClient from '../requestProcessing/addClient/index.js';
import searchClient from '../requestProcessing/searchClient/index.js';
import deleteClient from '../requestProcessing/deleteClient/index.js';
import setDiagnose from '../requestProcessing/setDiagnose/index.js';
import nextClient from '../requestProcessing/nextClient/index.js';

const router = Router();

router.route('/')
  .get(
    searchClient.isValidQueryParams,
    searchClient.controller,
  )
  .post(
    addClient.isValidClientData,
    addClient.isExistClientInQueue,
    addClient.controller,
  )
  .delete(
    deleteClient.isValidQueryParams,
    deleteClient.isExistClient,
    deleteClient.controller,
  )
  .patch(
    setDiagnose.isValidQueryParams,
    setDiagnose.isExistClient,
    setDiagnose.controller,
  );

router.route('/nextClient')
  .get(
    nextClient.controller,
  );

export default router;
