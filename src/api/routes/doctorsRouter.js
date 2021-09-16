import { Router } from 'express';

import getSpecializations from '../requestProcessing/doctors/getSpecializations/index.js';

const router = Router();

router.route('/specializations')
  .get(
    getSpecializations.controller,
  );

export default router;
