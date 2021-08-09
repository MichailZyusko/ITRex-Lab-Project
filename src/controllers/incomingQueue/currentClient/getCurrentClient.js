/* eslint-disable consistent-return */

const incomingQueue = require('../src/index.js');

module.exports = async (req, res) => {
  try {
    res.send(incomingQueue.currentClient);
  } catch (error) {
    console.error(error);
    return null;
  }
};
