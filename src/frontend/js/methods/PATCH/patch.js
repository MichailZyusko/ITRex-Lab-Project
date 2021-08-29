const reqObject = (data) => ({
  method: 'PATCH',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
    charset: 'UTF-8',
  },
});

const makePATCHRequest = (route) => async (ID = null, data = null) => {
  if (!data) {
    return false;
  }

  try {
    const response = await fetch(`${route}?id=${ID}`, reqObject(data));

    if (!response.ok) {
      const { message } = await response.json();

      alert(`Error: ${message}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export default makePATCHRequest('/api/clients/');
