import controller from './controller.js';
import isValidPasswordLogin from './isValidPasswordLogin.js';

class DoctorSignIn {
  constructor() {
    this.controller = controller;
    this.isValidPasswordLogin = isValidPasswordLogin;
  }
}

export default new DoctorSignIn();
