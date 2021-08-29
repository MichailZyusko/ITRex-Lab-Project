import medicalCardsTable from '../../../../../storage/database/tables/medicalCardsTable.js';

export default async (clientID, doctorID, comingDate) => {
  try {
    await medicalCardsTable.create({
      clientID,
      doctorID,
      resolution: null,
      comingDate,
      TTL: null,
    });
  } catch (error) {
    console.log(error);
  }
};
