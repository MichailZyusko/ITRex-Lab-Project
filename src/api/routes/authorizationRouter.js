import { Router } from 'express';

import signUp from '../requestProcessing/authorization/signUp/index.js';
import patientSignIn from '../requestProcessing/authorization/patientSignIn/index.js';
import doctorSignIn from '../requestProcessing/authorization/doctorSignIn/index.js';

const router = Router();

router.route('/signUp')
  .post(
    signUp.isValidPatientData,
    signUp.isExistClient,
    signUp.controller,
  );

router.route('/patient/signIn')
  .post(
    patientSignIn.isValidPasswordLogin,
    patientSignIn.controller,
  );

router.route('/doctor/signIn')
  .post(
    doctorSignIn.isValidPasswordLogin,
    doctorSignIn.controller,
  );

export default router;
