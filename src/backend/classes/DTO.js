const isEmpty = (obj) => (Object.keys(obj).length ? obj : undefined);

export default class DTO {
  constructor(data = null) {
    this.reqParam = isEmpty(data?.params);
    this.body = isEmpty(data?.body);
  }
}
