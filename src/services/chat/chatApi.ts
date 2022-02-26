import {HTTPTransport} from '../../modules';
import {OptionsType} from '../../types';

class ChatAPI {
  private api = new HTTPTransport();
  getChats(options: OptionsType) {
    return this.api.get('chats', options);
  }
}

export default new ChatAPI();
