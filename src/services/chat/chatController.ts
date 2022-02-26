import chatApi from './chatApi';
import {store} from '../../modules';

class ChatController {
  async getChats() {
    store.set('chat.isLoading', true);
    try {
      const response = await chatApi.getChats({
        parametrs: {offset: '50', limit: '100'},
      });
      if (response?.status === 200) {
        store.set('chat.data', response?.items);
      } else {
        const error = response?.items?.reason;
        throw new Error(error);
      }
    } catch (e) {
      const err = e as Error;
      store.set('chat.error', err.toString());
    } finally {
      store.set('chat.isLoading', false);
    }
  }

  async addChats() {
    store.set('chat.isLoading', true);
    try {
      const response = await chatApi.getChats({
        parametrs: {offset: '50', limit: '100'},
      });
      if (response?.status === 200) {
        store.set('chat.data', response?.items);
      } else {
        const error = response?.items?.reason;
        throw new Error(error);
      }
    } catch (e) {
      const err = e as Error;
      store.set('chat.error', err.toString());
    } finally {
      store.set('chat.isLoading', false);
    }
  }
}

export default new ChatController();
