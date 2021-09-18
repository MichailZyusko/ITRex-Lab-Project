import { Router } from 'express';

import currentPatient from '../requestProcessing/patients/currentPatient/index.js';
import queueUp from '../requestProcessing/patients/queueUp/index.js';
import getPatients from '../requestProcessing/patients/getPatients/index.js';
import getPatientByID from '../requestProcessing/patients/getPatientByID/index.js';

const router = Router();

router.route('/')
  .get(
    getPatients.isValidSearchingParams,
    getPatients.controller,
  );

router.route('/waiting/current')
  .get(
    currentPatient.isValidDoctorData,
    currentPatient.getController,
  )
  .delete(
    currentPatient.isValidDoctorData,
    currentPatient.deleteController,
  );

router.route('/me')
  .get(
    getPatientByID.isValidPatientID,
    getPatientByID.controller,
  )
  .post(
    queueUp.isValidPatientData,
    queueUp.isExistPatientInQueue,
    queueUp.controller,
  );

export default router;
