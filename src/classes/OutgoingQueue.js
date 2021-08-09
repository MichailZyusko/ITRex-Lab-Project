const Queue = require('./Queue.js');

// Исходящая очередь
module.exports = class OutgoingQueue extends Queue {
  findClient({ search }) {
    const client = this.data.find((item) => item.firstName === search);

    if (!client) {
      return { result: 'Nothing was found for your query' };
    }

    return { result: client };
  }

  deleteClient({ search }) {
    const deleteIndex = this.data.findIndex((item) => item.firstName === search);

    if (deleteIndex === -1) {
      return { result: 'Nothing was found for your query' };
    }

    this.data.splice(deleteIndex, 1);

    return { result: 'The operation was successful' };
  }
};
