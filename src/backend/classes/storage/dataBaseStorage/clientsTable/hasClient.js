/* eslint-disable no-undef */

import clientsTable from '../../../../../storage/database/tables/clientsTable.js';

export default async (key) => {
  try {
    const result = await clientsTable.count({
      where: clientID = `${key}`,
    });

    return !!result;
  } catch (error) {
    console.log(error);
  }
};
