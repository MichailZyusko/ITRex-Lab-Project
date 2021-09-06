import { Router } from 'express';

import signUp from '../requestProcessing/authorization/signUp/index.js';
import signIn from '../requestProcessing/authorization/signIn/index.js';

const router = Router();

router.route('/signUp')
  .post(
    signUp.isValidPatientData,
    signUp.isExistClient,
    signUp.controller,
  );

router.route('/signIn')
  .post(
    signIn.isValidPasswordLogin,
    signIn.controller,
  );

export default router;
