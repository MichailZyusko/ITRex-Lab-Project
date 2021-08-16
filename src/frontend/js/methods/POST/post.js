const reqObject = (data) => ({
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
  },
});

const makePOSTRequest = (route) => async (data = null) => {
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

const addClient = makePOSTRequest('/api/clients');

export default addClient;
