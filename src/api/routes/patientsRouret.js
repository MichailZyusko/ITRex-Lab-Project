import { Router } from 'express';

import currentPatient from '../requestProcessing/patients/currentPatient/index.js';
import getInQueue from '../requestProcessing/patients/queueUp/index.js';
import getAllPatient from '../requestProcessing/patients/getAllPatientsLikeValue/index.js';
import getPatientByID from '../requestProcessing/patients/getPatientByID/index.js';
import getPositionInQueue from '../requestProcessing/patients/getPositionInQueue/index.js';

const router = Router();

router.route('/')
  .get(
    getAllPatient.isValidQueryParams,
    getAllPatient.controller,
  )
  .post(
    getInQueue.isValidClientData,
    getInQueue.isExistClientInQueue,
    getInQueue.controller,
  );

router.route('/currentPatient')
  .get(
    currentPatient.getController,
  )
  .delete(
    currentPatient.deleteController,
  );

router.route('/id')
  .get(
    getPatientByID.isValidQueryParams,
    getPatientByID.controller,
  );

router.route('/positions')
  .get(
    getPositionInQueue.controller,
  );

export default router;
