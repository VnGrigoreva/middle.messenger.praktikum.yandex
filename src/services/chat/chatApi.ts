import {HTTPTransport} from '../../modules';
import {OptionsType} from '../../types';

class ChatAPI {
  private api = new HTTPTransport();
  getChats(options: OptionsType) {
    return this.api.get('chats', options);
  }
  addChats(options: OptionsType) {
    return this.api.post('chats', options);
  }
  deleteChat(options: OptionsType) {
    return this.api.delete('chats', options);
  }
  getToken(id: number) {
    return this.api.post(`chats/token/${id}`);
  }
}

export default new ChatAPI();
