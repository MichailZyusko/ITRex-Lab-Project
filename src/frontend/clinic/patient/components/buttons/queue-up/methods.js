const reqObject = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    charset: 'UTF-8',
  },
};

const queueUp = (route) => async (doctorID) => {
  try {
    if (!doctorID) {
      alert('Choose doctor');
      return false;
    }

    const response = await fetch(`${route}?specializationID=${doctorID}`, reqObject);
    const result = await response.json();

    if (!response.ok) {
      const { message } = result;

      alert(`Error: ${message}`);
      return false;
    }

    return result;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
};

export default queueUp('/api/patients/me/');
