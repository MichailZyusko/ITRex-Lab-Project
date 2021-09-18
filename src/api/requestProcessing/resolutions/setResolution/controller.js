import database from '../../../database/index.js';

export default async ({
  data: {
    diagnose, ID, TTL, doctorID,
  },
}, res, next) => {
  try {
    const comingDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await database.setDiagnose(ID, doctorID, diagnose, comingDate, TTL);
    const patient = await database.getPatientByID(ID);

    res.send(patient);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
