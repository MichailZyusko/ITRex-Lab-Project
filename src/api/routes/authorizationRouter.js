import { Router } from 'express';

import signUp from '../requestProcessing/authorization/patient/signUp/index.js';
import patientSignIn from '../requestProcessing/authorization/patient/signIn/index.js';
import doctorSignIn from '../requestProcessing/authorization/doctor/signIn/index.js';

const router = Router();

router.route('/patient/signUp')
  .post(
    signUp.isValidPatientData,
    signUp.isExistPatient,
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
