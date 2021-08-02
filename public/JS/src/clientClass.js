// Класс для создание пациентов
export default class Client {
  constructor(firstName, lastName, resolution = '') {
    this.firstName = firstName;
    this.lastName = lastName;
    this.resolution = resolution;
    this.fullName = `${this.firstName} ${this.lastName}`;
  }
}
