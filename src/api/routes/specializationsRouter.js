import { Router } from 'express';

import getAllSpecializations from '../requestProcessing/specialization/getAllspecializations/index.js';

const router = Router();

router.route('/')
  .get(
    getAllSpecializations.controller,
  );

export default router;
