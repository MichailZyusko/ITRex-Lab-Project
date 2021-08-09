/* eslint-disable consistent-return */

const chalk = require('chalk');
const outgoingQueue = require('../src/index.js');

module.exports = async (req, res, next) => {
  try {
    req.body = outgoingQueue.findClient(req.body);
    console.log((chalk.cyanBright(`> Finding ${req.body.search} in outgoingQueue`)));

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
