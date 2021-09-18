const getCurrentPatient = (route) => async () => {
  try {
    const response = await fetch(route);
    const result = await response.json();

    if (response.status === 302) {
      window.location = result.url;
    }

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getCurrentPatient('/api/patients/waiting/current');
