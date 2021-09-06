// import queue from '../../../storage/index.js';
// import MedicalCardsTable from '../../database/tables/medicalCardsTable/MedicalCardsTable.js';
import database from '../../../database/DatabaseStorage.js';

export default async ({ data: { diagnose, ID, TTL } }, res, next) => {
  try {
    const doctorID = '9e1de935-9df7-4dff-91f5-edf973c9d84';
    const comingDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    await database.setDiagnose(ID, doctorID, diagnose, comingDate, TTL);
    const patient = await database.getPatientByID(ID);

    res.send(patient);
  } catch (error) {
    console.error(error);
    next(error);
  }
};
