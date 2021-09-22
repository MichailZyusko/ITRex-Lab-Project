/* eslint-disable no-restricted-globals */

import deleteResolution from './services.js';

const table = document.getElementById('table');

/**
 * Удаляет резолюцию при нажатии на кнопку
 *
 * @param {Object} event - объект события нажатия на кнопку
 * @returns {Promise<*|null>}
 */

export default async (event) => {
  const { resolutionID } = event.currentTarget;

  const confirmed = confirm('Are you sure about this? The data cannot be recovered later');

  if (!(resolutionID && confirmed)) {
    return null;
  }

  const result = await deleteResolution(resolutionID);

  if (result) {
    Array.from(table.children).forEach((item) => {
      const tds = Array.from(item.children);
      const lastTD = tds[tds.length - 1];
      const button = lastTD.children[0];
      if (button.resolutionID === resolutionID) {
        tds[4].innerHTML = 'deleted';
      }
    });
  }

  return result;
};
