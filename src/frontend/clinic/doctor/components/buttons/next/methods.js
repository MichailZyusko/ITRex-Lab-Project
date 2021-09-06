const getCurrentPatient = (route) => async () => {
  try {
    const response = await fetch(route);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getCurrentPatient('/api/clients/currentPatient');
