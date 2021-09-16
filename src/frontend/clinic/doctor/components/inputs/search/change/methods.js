const getRequest = (route) => async (patientID) => {
  try {
    const response = await fetch(`${route}${patientID}`);
    const result = await response.json();

    return response.ok ? { result, ok: true } : { result, ok: false };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getRequest('/api/resolutions/patient/');
