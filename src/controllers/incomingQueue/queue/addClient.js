/* eslint-disable consistent-return */

const chalk = require('chalk');
const incomingQueue = require('../src/index.js');

module.exports = async (req, res, next) => {
  try {
    incomingQueue.addClient(req.body);
    console.log(chalk.green(`>> ${req.body.firstName} added to incomingQueue`));

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
