import credentialsTable from '../../../../storage/database/tables/credentialsTable.js';

export default async (login) => {
  try {
    const patient = await credentialsTable.findOne({ where: { login: `${login}` } });

    return patient;
  } catch (error) {
    console.log(error);
    return null;
  }
};
