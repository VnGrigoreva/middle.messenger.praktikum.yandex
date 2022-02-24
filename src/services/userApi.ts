import {HTTPTransport} from '../modules';

class UserAPI extends HTTPTransport {
  api: HTTPTransport;
  constructor() {
    super();
    this.api = new HTTPTransport();
  }
  read() {
    return this.api.get('auth/user');
  }
  update(data: {[k: string]: FormDataEntryValue}) {
    return this.api.put('user/profile', {
      body: data,
    });
  }
  exit() {
    return this.api.post('/auth/logout');
  }
}

export default new UserAPI();
