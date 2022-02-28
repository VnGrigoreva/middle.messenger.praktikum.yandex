import {HTTPTransport} from '../../modules';
import {OptionsType} from '../../types';

class AuthAPI extends HTTPTransport {
  private api = new HTTPTransport();
  signin(options: OptionsType) {
    return this.api.post('auth/signin', {...options});
  }
  signup(options: OptionsType) {
    return this.api.post('auth/signup', {...options});
  }
  logout() {
    return this.api.post('/auth/logout');
  }
}

export default new AuthAPI();
