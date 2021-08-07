const chalk = require('chalk');
const OutgoingQueue = require('../classes/OutgoingQueue.js');

const outgoingQueue = new OutgoingQueue();

const addClient = (req, res) => {
  console.log(chalk.blueBright(`>> ${req.body.firstName} added to outgoingQueue`));
  outgoingQueue.addClient(req.body);

  if (req.body.TTL >= 0) {
    setTimeout(() => {
      outgoingQueue.deleteClient({ search: req.body.firstName });
    }, req.body.TTL);
  }

  res.send(req.body);
};

const removeClient = (req, res) => {
  console.log(chalk.bgRedBright(`<< Deleting ${req.body.search} from outgoingQueue`));

  res.send(outgoingQueue.deleteClient(req.body));
};

const searchClient = (req, res) => {
  console.log((chalk.cyanBright(`> Finding ${req.body.search} in outgoingQueue`)));

  res.send(outgoingQueue.findClient(req.body));
};

const getOutgoingQueue = (req, res) => {
  res.send(outgoingQueue.data);
};

module.exports = {
  addClient, getOutgoingQueue, removeClient, searchClient,
};
