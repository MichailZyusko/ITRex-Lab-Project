import medicalCardsTable from '../../../../storage/database/tables/medicalCardsTable.js';

export default async (key, medicalCardID) => {
  try {
    await medicalCardsTable.create({
      patientID: key,
      medicalCardID,
    });
  } catch (error) {
    console.log(error);
  }
};
