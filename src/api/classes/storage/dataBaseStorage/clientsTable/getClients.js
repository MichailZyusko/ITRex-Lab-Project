import clientsTable from '../../../../../storage/database/tables/clientsTable.js';

export default async () => {
  try {
    const result = await clientsTable.findAll({ where: { status: 'false' } });

    return result;
  } catch (error) {
    console.log(error);
  }
};
