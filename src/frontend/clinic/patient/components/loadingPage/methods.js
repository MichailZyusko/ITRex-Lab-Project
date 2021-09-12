const getPatientDataByIDFunc = (route) => async () => {
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

const getAllSpecializationsFunc = (route) => async () => {
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

const getAllSpecializations = getAllSpecializationsFunc('/api/doctors/specializations');
const getPatientDataByID = getPatientDataByIDFunc('/api/clients/id');
export { getAllSpecializations, getPatientDataByID };
