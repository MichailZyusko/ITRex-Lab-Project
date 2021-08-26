/* eslint-disable no-undef */

import clientsTable from '../../../../../../storage/database/tables/clientsTable.js';

export default async (key) => {
  try {
    const result = await clientsTable.findOne({ where: { firstName: `${key}` } });

    return result;
  } catch (error) {
    console.log(error);
  }
};
