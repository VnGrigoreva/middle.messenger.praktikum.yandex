import {Block} from '../../components';
import template from './template';
import {compile} from '../../utils';
import {ContactList} from './components/ContactList/ContactList';
import {ButtonImage} from './components/ButtonImage/ButtonImage';
import menu from '../../assets/images/menu.png';
import attach from '../../assets/images/attach.png';
import send from '../../assets/images/send.png';
import {Message} from './components/Message/Message';
import {InputChat} from './components/InputChat/InputChat';
import {HTMLElementEvent} from '../../types';
import {Mediator} from '../../modules';

export class Chat extends Block {
  constructor() {
    super({}, 'div', 'chat');
  }

  message = '';

  render() {
    const contactListComp = new ContactList();

    const menuBtn = new ButtonImage({src: menu});

    const messageCompL = new Message({
      text: 'Some message text',
      mode: 'left',
    });

    const messageCompR = new Message({
      text: 'Some message text',
      mode: 'right',
    });

    const attachBtn = new ButtonImage({src: attach});

    const sendBtn = new ButtonImage({
      src: send,
      events: {
        click: () => {
          const error = Mediator.Instance.validateMessage(this.message);
          if (!error) {
            console.warn({message: this.message});
          }
          newMessageInput.setProps({
            error: error,
            value: '',
          });
        },
      },
    });

    const newMessageInput = new InputChat({
      className: 'chat-footer__message',
      placeholder: 'Сообщение',
      id: 'message',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          this.message = event.target.value;
        },
      },
    });

    return compile(template, {
      contactList: contactListComp,
      userName: 'Андрей',
      menu: menuBtn,
      messageL: messageCompL,
      messageR: messageCompR,
      attach: attachBtn,
      newMessage: newMessageInput,
      send: sendBtn,
    });
  }
}
