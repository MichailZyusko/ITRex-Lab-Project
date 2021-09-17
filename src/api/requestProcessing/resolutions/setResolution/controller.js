import database from '../../../database/index.js';

export default async ({
  data: { diagnose, ID, TTL },
  doctor: doctorSpecialization,
  doctor_full_name: name,
}, res, next) => {
  try {
    const comingDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await database.setDiagnose(ID, doctorSpecialization, diagnose, comingDate, TTL, name);
    const patient = await database.getPatientByID(ID);

    res.send(patient);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
