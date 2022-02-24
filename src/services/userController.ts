import userApi from './userApi';
import store from '../modules/store';
import {Router} from '../modules';
import {Routes} from '../types';

class UserController {
  async getUser() {
    store.set('user.isLoading', true);
    try {
      const response = await userApi.read();
      if (response?.status === 200) {
        store.set('user.data', response?.items);
      } else {
        const error = response?.items?.reason;
        throw new Error(error);
      }
    } catch (e) {
      const err = e as Error;
      store.set('user.error', err.toString());
    } finally {
      store.set('user.isLoading', false);
    }
  }
  async leaveProfile() {
    store.set('user.isLoading', true);
    try {
      const response = await userApi.exit();
      if (response?.status === 200) {
        const router = new Router('.app');
        router.go(Routes.Login);
      } else {
        const error = response?.items?.reason;
        throw new Error(error);
      }
    } catch (e) {
      const err = e as Error;
      store.set('user.error', err.toString());
    } finally {
      store.set('user.isLoading', false);
    }
  }
}

export default new UserController();
