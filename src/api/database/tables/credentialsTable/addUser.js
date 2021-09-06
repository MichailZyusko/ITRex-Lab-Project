import credentialsTable from '../../../../storage/database/tables/credentialsTable.js';

export default async (email, patientID, password) => {
  try {
    const userID = patientID;
    await credentialsTable.create({
      login: email,
      userID,
      password,
    });
  } catch (error) {
    console.log(error);
  }
};
