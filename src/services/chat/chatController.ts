import chatApi from './chatApi';
import {store} from '../../modules';
import {FromEntriesType} from '../../types';

class ChatController {
  async getChats() {
    store.set('chat.isLoading', true);
    try {
      const response = await chatApi.getChats({
        parametrs: {offset: '0', limit: '100'},
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

  async addChats(data: FromEntriesType) {
    store.set('chat.isLoading', true);
    try {
      const response = await chatApi.addChats({
        body: data,
      });
      if (response?.status !== 200) {
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

  async deleteChat(data: FromEntriesType) {
    store.set('chat.isLoading', true);
    try {
      const response = await chatApi.deleteChat({
        body: data,
      });
      if (response?.status !== 200) {
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

  setActiveChat(id: any) {
    store.set('chat.activeChat', id);
  }

  async getToken(id: string) {
    store.set('chatBody.isLoading', true);
    try {
      const response = await chatApi.getToken(id);
      if (response?.status !== 200) {
        const error = response?.items?.reason;
        throw new Error(error);
      } else return response.items.token;
    } catch (e) {
      const err = e as Error;
      store.set('chatBody.error', err.toString());
      return '';
    } finally {
      store.set('chatBody.isLoading', false);
    }
  }
}

export default new ChatController();
