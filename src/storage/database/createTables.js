import sequelize from './index.js';
import {
  allQueuesTable, clientsTable,
  doctorsTable, medicalCardsTable, queuesTable,
} from './tables/index.js';

export default async () => {
  try {
    await (async () => {
      console.log(allQueuesTable, clientsTable,
        doctorsTable, medicalCardsTable, queuesTable);
    })();

    await sequelize.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
};
