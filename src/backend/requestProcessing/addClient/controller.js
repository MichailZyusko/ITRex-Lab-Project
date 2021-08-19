/* eslint-disable no-param-reassign */

import chalk from 'chalk';
import queue from '../../../storage/index.js';

let ID = 0;
// 201, 202
// резолюция как отдельный класс, в котором есть поле пациент айди

export default async ({ client }, res, next) => {
  try {
    client.ID = ID;
    await queue.addClient(ID, client);
    ID += 1;
    console.log(chalk.green(`>> ${client.firstName} added to incomingQueue`));

    // Возвращать не просто строку, а currentClient and nexyClient
    // Сделать отдельный класс для этого
    res.status(201).send({ result: 'Everything is good' });
  } catch (error) {
    next(error);
  }
};
