import pkg from 'sequelize';
import clientsTable from '../../../../storage/database/tables/clientsTable.js';

const { Op } = pkg;

export default async (text) => {
  try {
    const allPatients = await clientsTable.findAll({
      where: {
        [Op.or]: {
          firstName: { [Op.like]: `%${text}%` },
          lastName: { [Op.like]: `%${text}%` },
          email: { [Op.like]: `%${text}%` },
        },
      },
    });

    return allPatients;
  } catch (error) {
    console.log(error);
    return null;
  }
};
