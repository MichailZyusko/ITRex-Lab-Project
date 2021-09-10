import { Router } from 'express';

import getAllResolutions from '../requestProcessing/resolutions/getAllResolutions/index.js';
import setResolution from '../requestProcessing/resolutions/setResolution/index.js';
import deleteResolutionByID from '../requestProcessing/resolutions/deleteResolution/index.js';
import getResolutionByID from '../requestProcessing/resolutions/getResolutionByID/index.js';
import getAllResolutionsByID from '../requestProcessing/resolutions/getAllResolutionsByID/index.js';

const router = Router();

router.route('/')
  .get(
    getAllResolutions.isValidQueryParams,
    getAllResolutions.controller,
  )
  .post(
    setResolution.isValidQueryParams,
    setResolution.findDoctorSpecialization,
    setResolution.findDoctorName,
    setResolution.isExistClient,
    setResolution.controller,
  );

router.route('/id')
  .get(
    getResolutionByID.isValidQueryParams,
    getResolutionByID.controller,
  ).delete(
    deleteResolutionByID.isValidQueryParams,
    // deleteResolution.isExistClient,
    deleteResolutionByID.controller,
  );

router.route('/patient/:id')
  .get(
    getAllResolutionsByID.isValidParams,
    getAllResolutionsByID.controller,
  );
export default router;
