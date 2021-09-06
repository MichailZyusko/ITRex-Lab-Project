import validator from 'validator';
import ApiError from '../../../../errors/ApiError.js';

class SetDiagnoseDTO {
  constructor({ body: { username: patient } }) {
    this.patientDTO = patient;
  }
}

const isValid = (patient) => validator.isAlpha(patient.firstName)
  && validator.isAlpha(patient.lastName)
  && validator.isAlpha(patient.gender)
  && validator.isEmail(patient.email);
  // && validator.isDate(patient.birthday);
  // && validator.isAlpha(patient.password);
// && validator.isAlpha(patient.birthday)

export default async (req, res, next) => {
  try {
    const { patientDTO } = new SetDiagnoseDTO(req);

    const [firstName, lastName, birthday, gender, email, password] = patientDTO;
    const patient = {
      firstName,
      lastName,
      birthday,
      gender,
      email,
      password,
    };

    if (!patient) {
      throw new ApiError(400, 'Invalid request body');
    }

    if (!isValid(patient)) {
      throw new ApiError(400, 'Not valid patient data');
    }

    req.data = patient;
    next();
  } catch (error) {
    next(error);
  }
};
