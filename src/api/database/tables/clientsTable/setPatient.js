import clientsTable from '../../../../storage/database/tables/clientsTable.js';

export default async (patient) => {
  try {
    await clientsTable.create(patient);
  } catch (error) {
    console.log(error);
  }
};
