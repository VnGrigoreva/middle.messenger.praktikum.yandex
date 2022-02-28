import {HTTPTransport} from '../../modules';
import {OptionsType} from '../../types';

class UserAPI {
  private api = new HTTPTransport();
  getUser() {
    return this.api.get('auth/user');
  }
  setProfile(options: OptionsType) {
    return this.api.put('user/profile', {...options});
  }
  setPassword(options: OptionsType) {
    return this.api.put('user/password', {...options});
  }
  setAvatar(options: OptionsType) {
    return this.api.put('user/profile/avatar', {...options});
  }
}

export default new UserAPI();
