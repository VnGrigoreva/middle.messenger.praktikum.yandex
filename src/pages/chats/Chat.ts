import {Block} from '../../components';
import template from './template';
import {compile, connect} from '../../utils';
import ContactList from './components/ContactList/ContactList';
import {ButtonImage} from './components/ButtonImage/ButtonImage';
import menu from '../../assets/images/menu.png';
import attach from '../../assets/images/attach.png';
import send from '../../assets/images/send.png';
import {Message} from './components/Message/Message';
import {InputChat} from './components/InputChat/InputChat';
import {HTMLElementEvent} from '../../types';
import {Mediator} from '../../modules';
import {chatController, userController} from '../../services';

class Chat extends Block {
  constructor() {
    super({}, 'div', 'chat');
  }

  message = '';

  componentDidMount() {
    if (!this.props?.data) {
      chatController.getChats();
    }
    if (!this.props?.user) {
      userController.getUser();
    }
  }

  render() {
    const contactListComp = new ContactList();

    const menuBtn = new ButtonImage({src: menu});

    const messageComponents =
      this.props?.messages?.map(
        (e) =>
          new Message({
            text: e.content,
            mode: e.user_id === this.props.user.id ? 'right' : 'left',
          })
      ) || [];

    const attachBtn = new ButtonImage({src: attach});

    const sendBtn = new ButtonImage({
      src: send,
      events: {
        click: () => {
          const error = Mediator.Instance.validateMessage(this.message);
          if (!error) {
            console.warn({message: this.message});
            chatController.send(this.props?.activeChat, this.message);
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
      userName: this.props?.data?.filter(
        (e) => e.id === this.props?.activeChat
      )[0]?.title,
      menu: menuBtn,
      messages: messageComponents,
      attach: attachBtn,
      newMessage: newMessageInput,
      send: sendBtn,
    });
  }
}

function mapStateToProps(state: any) {
  return {
    activeChat: state?.chat?.activeChat,
    data: state?.chat?.data,
    user: state?.user?.data,
    messages:
      state?.chat?.sessions?.find((e) => e.chatId === state?.chat?.activeChat)
        ?.messages || [],
  };
}

export default connect(Chat, mapStateToProps);
