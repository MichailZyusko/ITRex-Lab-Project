/* eslint-disable consistent-return */

import chalk from 'chalk';
import queue from '../storage/index.js';

let ID = 0;
// 201, 202
// резолюция как отдельный класс, в котором есть поле пациент айди
// добавить везде асихронность где нужно
// Вынести все try/catch
export default async (req, res, next) => {
  try {
    req.data.body.ID = ID;
    ID += 1;
    queue.addClient(req.data.body);
    console.log(chalk.green(`>> ${req.data.body.firstName} added to incomingQueue`));

    res.send(req.data.body);
  } catch (error) {
    next(error);
  }
};
