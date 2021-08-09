const reqObject = (data) => ({
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
  },
});

const makePOSTrequect = (route) => async (data) => {
  if (!data) {
    return null;
  }

  try {
    const response = await fetch(route, reqObject(data));
    const result = await response.json();
    console.log('The operation was successful');
    return result;
  } catch (error) {
    console.error('Error:', error);
  }

  return null;
};

const addClientToIncomingQueue = makePOSTrequect('/api/incomingQueue');
const addClientToOutgoingQueue = makePOSTrequect('/api/outgoingQueue');
const setCurrentClient = makePOSTrequect('/api/incomingQueue/currentClient');
const searchClientInOutgoingQueue = makePOSTrequect('/api/outgoingQueue/searchClient');

export {
  addClientToIncomingQueue, addClientToOutgoingQueue, searchClientInOutgoingQueue, setCurrentClient,
};
