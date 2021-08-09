/* eslint-disable consistent-return */

const chalk = require('chalk');
const incomingQueue = require('../src/index.js');

// Использовать фильтр для удаления элемента
module.exports = async (req, res, next) => {
  try {
    console.log(chalk.yellow(`<< ${req.body.firstName} walks into the doctor's office`));
    incomingQueue.deleteClient();

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
