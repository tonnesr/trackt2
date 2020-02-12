export default class HelperBase {
  public headers: Headers;

  constructor() {    
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }
}