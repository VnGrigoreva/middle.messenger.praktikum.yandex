import { Block } from '../../components';
import template from './template';
import compile from '../../utils/compile';
import { ContactList } from './components/ContactList/ContactList';
import { ButtonImage } from './components/ButtonImage/ButtonImage';
import menu from '../../assets/images/menu.png'
import attach from '../../assets/images/attach.png'
import send from '../../assets/images/send.png'
import { Message } from './components/Message/Message';
import { InputChat } from './components/InputChat/InputChat';

export class Chat extends Block {
  constructor() {
    super({}, 'div', 'chat');
  }

  render() {
    const contactListComp = new ContactList();
    const menuBtn = new ButtonImage({src: menu});
    const messageCompL = new Message({text: 'Some message text', mode: 'left'});
    const messageCompR = new Message({text: 'Some message text', mode: 'right'});
    const attachBtn = new ButtonImage({src: attach});
    const sendBtn = new ButtonImage({src: send});
    const newMessageInput = new InputChat({className: 'chat-footer__message', placeholder: 'Сообщение', id: 'message'})
    return compile(template, { 
      contactList: contactListComp,
      userName: 'Андрей', //нужно достать из выбранного часа потом
      menu: menuBtn,
      messageL: messageCompL, //дб цикл
      messageR: messageCompR, //дб цикл
      attach: attachBtn,
      newMessage: newMessageInput,
      send: sendBtn,
    });
  }
}