/* eslint-disable class-methods-use-this */

import controller from './controller.js';

class NextClient {
  controller(req, res, next) {
    return controller(req, res, next);
  }
}

export default new NextClient();
