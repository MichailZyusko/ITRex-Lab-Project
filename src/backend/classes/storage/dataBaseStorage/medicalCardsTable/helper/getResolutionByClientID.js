/* eslint-disable no-undef */

import medicalCardsTable from '../../../../../../storage/database/tables/medicalCardsTable.js';

export default async (clientID) => {
  try {
    const { diagnose } = await medicalCardsTable.findOne({ where: { clientID: `${clientID}` } });

    return diagnose;
  } catch (error) {
    console.log(error);
  }
};
