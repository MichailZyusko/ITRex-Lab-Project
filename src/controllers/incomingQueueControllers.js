const chalk = require('chalk');
const IncomingQueue = require('../classes/IncomingQueue.js');

const incomingQueue = new IncomingQueue();

const addClient = (req, res) => {
  console.log(chalk.green(`>> ${req.body.firstName} added to incomingQueue`));
  incomingQueue.addClient(req.body);

  res.send(req.body);
};

const removeClient = (req, res) => {
  console.log(chalk.yellow(`<< ${req.body.firstName} walks into the doctor's office`));
  incomingQueue.deleteClient();

  res.send(req.body);
};

const getIncomingQueue = (req, res) => {
  res.send(incomingQueue.data);
};

module.exports = { addClient, getIncomingQueue, removeClient };
