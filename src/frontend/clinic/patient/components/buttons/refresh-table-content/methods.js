const getAllResolutions = (route) => async () => {
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

export default getAllResolutions('/api/resolutions/');
