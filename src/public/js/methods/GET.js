const makeGETrequect = (route) => async () => {
  try {
    const preresult = await fetch(route);
    const result = await preresult.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCurrentClient = makeGETrequect('/api/incomingQueue/currentClient');
const getIncomingQueue = makeGETrequect('/api/incomingQueue');

export { getCurrentClient, getIncomingQueue };
