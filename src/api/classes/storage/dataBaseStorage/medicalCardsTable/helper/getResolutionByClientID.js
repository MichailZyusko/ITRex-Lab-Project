import medicalCardsTable from '../../../../../../storage/database/tables/medicalCardsTable.js';

export default async (clientID) => {
  try {
    const { diagnose, status, TTL } = await medicalCardsTable.findOne({
      where: { clientID: `${clientID}` },
    });

    return { diagnose, status, TTL };
  } catch (error) {
    console.log(error);
  }
};
