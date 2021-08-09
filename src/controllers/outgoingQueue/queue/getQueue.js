/* eslint-disable consistent-return */

const outgoingQueue = require('../src/index.js');

module.exports = async (req, res) => {
  try {
    res.send(outgoingQueue.data);
  } catch (error) {
    console.error(error);
    return null;
  }
};
