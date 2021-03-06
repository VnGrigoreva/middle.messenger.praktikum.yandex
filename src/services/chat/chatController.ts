import chatApi from './chatApi';
import {store} from '../../modules';
import {DeleteChatParamsType, FromEntriesType} from '../../types';

class ChatController {
  constructor() {
    this.ping();
  }
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

  async deleteChat(data: DeleteChatParamsType) {
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

  async getToken(id: number) {
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

  async connect(chatId: number) {
    const currentSession = store
      .getState()
      ?.chat?.sessions?.find((e) => e.chatId === chatId);

    if (currentSession) {
      return;
    }

    const token = await this.getToken(chatId);
    const userId = store.getState()?.user?.data?.id;
    const socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    socket.addEventListener('open', () => {
      console.warn('???????????????????? ??????????????????????');
      let allSessions = store.getState()?.chat?.sessions;
      if (!allSessions) {
        allSessions = [];
      }
      allSessions.push({
        socket,
        chatId,
        messages: [],
      });
      store.set('chat.sessions', allSessions);
    });
    socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
          const s = store.getState().chat.sessions;
          const session = s.find((e) => e?.chatId === chatId);
          if (session) {
            session.messages.push(data);
          }
          store.set('chat.sessions', s);
        }
        // eslint-disable-next-line no-empty
      } catch {}
    });
    socket.addEventListener('error', (event: any) => {
      console.warn('????????????', event.message);
      const s = store.getState().chat.sessions;
      const session = s.find((e) => e?.chatId === chatId);
      if (session) {
        session.socket = null;
      }
      store.set('chat.sessions', s);
    });
    socket.addEventListener('close', (event) => {
      const s = store.getState().chat.sessions;
      const session = s.find((e) => e?.chatId === chatId);
      if (session) {
        session.socket = null;
      }
      store.set('chat.sessions', s);
      if (event.wasClean) {
        console.warn('???????????????????? ?????????????? ??????????');
      } else {
        console.warn('?????????? ????????????????????');
      }
      console.warn(`??????: ${event.code} | ??????????????: ${event.reason}`);
    });
  }

  send(chatId: number, message: string) {
    const s = store.getState().chat.sessions.find((e) => e.chatId === chatId);
    s?.socket?.send(JSON.stringify({content: message, type: 'message'}));
  }

  ping() {
    setInterval(() => {
      const activeChat = store.getState()?.chat?.activeChat;
      if (!activeChat) {
        return;
      }
      const s = store
        .getState()
        .chat.sessions.find((e) => e.chatId === activeChat);
      s?.socket?.send(JSON.stringify({type: 'ping'}));
    }, 5000);
  }
}

export default new ChatController();
