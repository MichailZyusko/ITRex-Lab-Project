import controller from './controller.js';
import isExistResolution from './isExistResolution.js';
import isValidResolutionID from './isValidResolutionID.js';

class DeleteClient {
  constructor() {
    this.controller = controller;
    this.isValidResolutionID = isValidResolutionID;
    this.isExistResolution = isExistResolution;
  }
}

export default new DeleteClient();
