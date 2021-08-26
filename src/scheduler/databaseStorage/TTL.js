/* eslint-disable no-param-reassign */

import medicalCardsTable from '../../storage/database/tables/medicalCardsTable.js';

export default async (refreshTime) => {
  try {
    const allData = await medicalCardsTable.findAll();
    // TODO Добавить булевский флаг, который будет ослеживать изменения и не дудусить лишний раз БД
    allData.map((item) => {
      if (item.TTL !== 'NULL' && item.TTL - refreshTime <= 0) {
        item.diagnose = null;
        item.TTL = null;
      } else {
        item.TTL -= refreshTime;
      }

      return item;
    }).forEach(async (item) => {
      await medicalCardsTable.update(
        {
          diagnose: item.diagnose,
          TTL: item.TTL,
        },
        {
          where: {
            clientID: `${item.clientID}`,
          },
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};
