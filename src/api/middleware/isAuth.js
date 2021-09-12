import jwt from 'jsonwebtoken';
import config from '../../../config.js';
import ApiError from '../../errors/ApiError.js';

class GetTokenDTO {
  constructor({ cookies: { patientToken, doctorToken } } = {}) {
    this.patientToken = patientToken;
    this.doctorToken = doctorToken;
  }
}

const { secretKey } = config;

export default (req, res, next) => {
  try {
    const { patientToken, doctorToken } = new GetTokenDTO(req);

    if ((!patientToken) && (!doctorToken)) {
      return res.redirect('http://localhost:3000/patient-sign-in/');
    }
    try {
      if (patientToken) {
        const { id: patientID } = jwt.verify(patientToken, secretKey);
        req.patientID = patientID;
      }
      if (doctorToken) {
        const { id: doctorID } = jwt.verify(doctorToken, secretKey);
        req.doctorID = doctorID;
      }
    } catch (err) {
      throw new ApiError(401, 'Invalid Token');
    }

    next();
  } catch (error) {
    next(error);
  }
};
