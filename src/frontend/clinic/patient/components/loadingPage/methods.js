const getRequest = (route) => async () => {
  try {
    const response = await fetch(route);

    const result = await response.json();
    if (response.status === 302) {
      window.location = result.url;
    }

    if (response.ok) {
      return result;
    }

    return false;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAllSpecializations = getRequest('/api/doctors/specializations/');
const getPatientDataByID = getRequest('/api/patients/me/');
export { getAllSpecializations, getPatientDataByID };
