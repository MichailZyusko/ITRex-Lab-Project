import { Router } from 'express';

import setResolution from '../requestProcessing/resolutions/setResolution/index.js';
import deleteResolutionByID from '../requestProcessing/resolutions/deleteResolution/index.js';
import getResolutionsByID from '../requestProcessing/resolutions/getResolutionsByID/index.js';

const router = Router();

router.route('/:id')
  .delete(
    deleteResolutionByID.isValidResolutionID,
    deleteResolutionByID.isExistResolution,
    deleteResolutionByID.controller,
  );

router.route('/patient/:id')
  .get(
    getResolutionsByID.isValidPatientID,
    getResolutionsByID.controller,
  )
  .post(
    setResolution.isValidRequestData,
    setResolution.isExistPatientID,
    setResolution.findDoctorSpecialization,
    setResolution.findDoctorName,
    setResolution.controller,
  );
export default router;
