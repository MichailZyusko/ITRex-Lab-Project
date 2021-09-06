import clientsTable from '../../../../storage/database/tables/clientsTable.js';

export default async ({
  firstName, lastName, birthday, gender,
}) => {
  try {
    const patient = await clientsTable.findOne({
      where: {
        firstName: `${firstName}`,
        lastName: `${lastName}`,
        birthday: `${birthday}`,
        gender: `${gender}`,
      },
    });

    return patient;
  } catch (error) {
    console.log(error);
    return null;
  }
};
