/* eslint-disable class-methods-use-this */

import controller from './controller.js';
import IsExistClient from './isExistClient.js';
import IsValidClientData from './isValidClientData.js';

class AddClient {
  controller(req, res, next) {
    return controller(req, res, next);
  }

  isValidClientData(req, res, next) {
    return IsValidClientData(req, res, next);
  }

  isExistClientData(req, res, next) {
    return IsExistClient(req, res, next);
  }
}

export default new AddClient();
