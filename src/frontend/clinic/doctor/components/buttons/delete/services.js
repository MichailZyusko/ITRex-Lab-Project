import deleteResolution from './methods.js';

/**
 * Удаляет резолюцию с определенным id:resolutionID
 *
 * @param {string} resolutionID - UUID резолюции
 * @returns {Promise<string>}
 */
export default async (resolutionID) => {
  if (await deleteResolution(resolutionID)) {
    return 'This client was successfully delete';
  }

  return 'Failed to delete the client :(';
};
