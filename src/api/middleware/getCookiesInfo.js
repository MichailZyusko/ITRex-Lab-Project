import jwt from 'jsonwebtoken';
import config from '../../../config.js';
import ApiError from '../../errors/ApiError.js';
import database from '../database/index.js';

class GetTokenDTO {
  constructor({ cookies: { patientToken, doctorToken } } = {}) {
    this.patientToken = patientToken;
    this.doctorToken = doctorToken;
  }
}

const { secretKey } = config;

export default async (req, res, next) => {
  try {
    const { patientToken, doctorToken } = new GetTokenDTO(req);

    try {
      if (patientToken) {
        const { id: userID } = jwt.verify(patientToken, secretKey);
        const patient = await database.getPatientByUserID(userID);
        req.patientID = patient.id;
      }
      if (doctorToken) {
        const { id: userID } = jwt.verify(doctorToken, secretKey);
        const doctor = await database.getDoctorByUserID(userID);
        req.doctorID = doctor.doctor_id;
      }
    } catch (err) {
      throw new ApiError(401, 'Invalid Token');
    }

    next();
  } catch (error) {
    next(error);
  }
};
