const { incomingQueue, currentClient } = require('./incomingQueue/index.js');
const outgoingQueue = require('./outgoingQueue/index.js');

module.exports = { incomingQueue, outgoingQueue, currentClient };
