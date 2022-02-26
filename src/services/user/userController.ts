import userApi from './userApi';
import {Router, store} from '../../modules';
import {FromEntriesType, Routes} from '../../types';

class UserController {
  async getUser() {
    store.set('user.isLoading', true);
    try {
      const response = await userApi.getUser();
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

  async setProfile(data: FromEntriesType) {
    store.set('user.isLoading', true);
    try {
      const response = await userApi.setProfile({
        body: data,
      });
      if (response?.status === 200) {
        store.set('user.data', response.items);
        // const router = new Router('.app');
        // router.go(Routes.Profile);
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

  async setAvatar(data: FormData) {
    store.set('user.isLoading', true);
    try {
      const response = await userApi.setAvatar({
        body: data,
        withFiles: true,
      });
      if (response?.status === 200) {
        store.set('user.data', response.items);
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

  async setPassword(data: FromEntriesType) {
    store.set('user.isLoading', true);
    try {
      const response = await userApi.setPassword({
        body: data,
      });
      if (response?.status === 200) {
        const router = new Router('.app');
        router.go(Routes.Profile);
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
