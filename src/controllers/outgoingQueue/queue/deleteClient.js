/* eslint-disable consistent-return */

const chalk = require('chalk');
const outgoingQueue = require('../src/index.js');

// Использовать фильтр для удаления элемента
module.exports = async (req, res, next) => {
  try {
    req.body = outgoingQueue.deleteClient(req.body);
    console.log(chalk.bgRedBright(`<< Deleting ${req.body.search} from outgoingQueue`));

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
