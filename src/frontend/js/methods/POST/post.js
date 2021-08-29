const reqObject = (data) => ({
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
    charset: 'UTF-8',
  },
});

const makePOSTRequest = (route) => async (data = null) => {
  if (!data) {
    return false;
  }

  try {
    const response = await fetch(route, reqObject(data));

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

export default makePOSTRequest('/api/clients');
