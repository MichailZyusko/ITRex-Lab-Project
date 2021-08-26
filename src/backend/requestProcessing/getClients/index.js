/* eslint-disable class-methods-use-this */

import controller from './controller.js';

class GetClients {
  controller(req, res, next) {
    return controller(req, res, next);
  }
}

export default new GetClients();
