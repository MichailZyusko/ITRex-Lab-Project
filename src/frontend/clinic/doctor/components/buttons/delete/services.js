import deleteResolution from './methods.js';

export default async (resolutionID) => {
  if (await deleteResolution(resolutionID)) {
    return 'This client was successfully delete';
  }

  return 'Failed to delete the client :(';
};
