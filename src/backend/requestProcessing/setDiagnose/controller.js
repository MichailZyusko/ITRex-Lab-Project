import chalk from 'chalk';
import queue from '../../../storage/index.js';

export default async ({ diagnose, ID, TTL }, res, next) => {
  try {
    const { result: client } = await queue.setDiagnose(ID, diagnose, TTL);

    console.log(chalk.yellow(`<< ${client.firstName} has been diagnosed by a doctor`));

    res.status(201).send({ result: 'Everything is good' });
  } catch (error) {
    next(error);
  }
};
