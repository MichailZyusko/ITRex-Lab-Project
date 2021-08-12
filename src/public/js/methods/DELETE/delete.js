const reqObject = () => ({
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
});

const makeDELETERequest = (route) => async (ID = null) => {
  try {
    const response = await fetch(`${route}${ID}`, reqObject());
    const result = await response.json();
    console.log('The operation was successful');
    return result;
  } catch (error) {
    console.error('Error:', error);
  }

  return null;
};

const deleteClient = makeDELETERequest('/api/clients/');

export default deleteClient;
