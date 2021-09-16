const getRequest = (route) => async () => {
  try {
    const response = await fetch(route);
    const result = await response.json();

    if (!response.ok) {
      const { result: message } = result;

      alert(`Error ${message}`);
      return false;
    }
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getAllSpecializations = getRequest('/api/doctors/specializations/');
const getPatientDataByID = getRequest('/api/patients/me/');
export { getAllSpecializations, getPatientDataByID };
