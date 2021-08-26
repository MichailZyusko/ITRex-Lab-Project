const reqObject = () => ({
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
});

const makeDELETERequest = (route) => async (searchString) => {
  try {
    const response = await fetch(`${route}?searchString=${searchString}`, reqObject());
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
