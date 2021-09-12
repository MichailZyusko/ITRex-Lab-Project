import { Router } from 'express';

import getAllSpecializations from '../requestProcessing/doctors/getAllspecializations/index.js';

const router = Router();

router.route('/specializations')
  .get(
    getAllSpecializations.controller,
  );

export default router;
