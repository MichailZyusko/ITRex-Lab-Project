import database from '../../../database/index.js';

export default async ({ data: patientID }, res, next) => {
  try {
    const patient = await database.getPatientByID(patientID);

    res.send(patient);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
