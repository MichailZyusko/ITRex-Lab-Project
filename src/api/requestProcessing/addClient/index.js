/* eslint-disable class-methods-use-this */

import controller from './controller.js';
import isExistClientInQueue from './isExistClientInQueue.js';
import isValidClientData from './isValidClientData.js';

class AddClient {
  controller(req, res, next) {
    return controller(req, res, next);
  }

  isValidClientData(req, res, next) {
    return isValidClientData(req, res, next);
  }

  isExistClientInQueue(req, res, next) {
    return isExistClientInQueue(req, res, next);
  }
}

export default new AddClient();
