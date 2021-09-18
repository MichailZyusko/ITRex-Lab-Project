import { Router } from 'express';

import getSpecializations from '../requestProcessing/doctors/getSpecializations/index.js';
import getDoctorsBySpec from '../requestProcessing/doctors/getDoctorsBySpec/index.js';

const router = Router();

router.route('/specializations')
  .get(
    getSpecializations.controller,
  );

router.route('/specializations/:id')
  .get(
    getDoctorsBySpec.isValidSpecID,
    getDoctorsBySpec.controller,
  );

export default router;
