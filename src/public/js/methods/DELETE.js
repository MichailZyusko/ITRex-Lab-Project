const reqObject = (data) => ({
  method: 'DELETE',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
  },
});

const makeDELETErequect = (route) => async (data) => {
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

const deleteClientFromIncomingQueue = makeDELETErequect('/api/incomingQueue');
const deleteClientFromOutgoingQueue = makeDELETErequect('/api/outgoingQueue');

export { deleteClientFromIncomingQueue, deleteClientFromOutgoingQueue };
