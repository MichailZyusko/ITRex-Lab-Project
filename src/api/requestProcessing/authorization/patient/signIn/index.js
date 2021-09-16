import controller from './controller.js';
import isValidPasswordLogin from './isValidPasswordLogin.js';

class PatientSignIn {
  constructor() {
    this.controller = controller;
    this.isValidPasswordLogin = isValidPasswordLogin;
  }
}

export default new PatientSignIn();
