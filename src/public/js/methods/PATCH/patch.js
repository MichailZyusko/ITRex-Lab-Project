const reqObject = (data) => ({
  method: 'PATCH',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
  },
});

const makePATCHRequest = (route) => async (ID = null, data = null) => {
  if (!data) {
    return null;
  }

  try {
    const response = await fetch(`${route}${ID}`, reqObject(data));
    const result = await response.json();
    console.log('The operation was successful');
    return result;
  } catch (error) {
    console.error('Error:', error);
  }

  return null;
};

const patchClient = makePATCHRequest('/api/clients/');

export default patchClient;
