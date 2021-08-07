const reqObject = (data) => ({
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default async (data, path) => {
  if (!data) { return null; }

  try {
    const response = await fetch(`/${path}`, reqObject(data));
    const result = await response.json();
    console.log('The operation was successful');
    return result;
  } catch (error) {
    console.error('Error:', error);
  }

  return null;
};
