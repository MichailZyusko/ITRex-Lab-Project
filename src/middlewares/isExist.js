/* eslint-disable consistent-return */

const incomingQueue = require('../controllers/incomingQueue/src/index.js');

const isExist = (obj) => incomingQueue.data.find((e) => JSON.stringify(e) === JSON.stringify(obj));

module.exports = async (req, res, next) => {
  try {
    if (isExist(req.body)) {
      res.status(404).send({ result: 'This client exist' });
      return null;
    }

    next();
  } catch (error) {
    console.error(error);
    return null;
  }
};
