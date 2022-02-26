import authApi from './authApi';
import {store} from '../../modules';
import {Router} from '../../modules';
import {FromEntriesType, Routes} from '../../types';

class AuthController {
  async signin(parametrs: FromEntriesType) {
    store.set('auth.isLoading', true);
    try {
      const response = await authApi.signin({
        body: parametrs,
      });
      if (response?.status === 200) {
        const router = new Router('.app');
        router.go(Routes.Chat);
      } else {
        const error = response?.items?.reason;
        throw new Error(error);
      }
    } catch (e) {
      const err = e as Error;
      store.set('auth.error', err);
    } finally {
      store.set('auth.isLoading', false);
    }
  }
  async signup(registrationData: FromEntriesType) {
    store.set('registration.isLoading', true);
    try {
      const response = await authApi.post('auth/signup', {
        body: registrationData,
      });
      if (response?.status === 200) {
        store.set('registration.success', 'Поздравляем! Вы зарегистрированы.');
      } else {
        const error = response?.items?.reason;
        throw new Error(error);
      }
    } catch (e) {
      const err = e as Error;
      store.set('registration.error', err.toString());
    } finally {
      store.set('registration.isLoading', false);
    }
  }
  async logout() {
    store.set('user.isLoading', true);
    try {
      const response = await authApi.logout();
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

export default new AuthController();
