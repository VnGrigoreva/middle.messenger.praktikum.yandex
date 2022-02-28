import {Block, Link} from '../../../../components';
import template from './template';
import {compile, connect} from '../../../../utils';
import {InputChat} from '../InputChat/InputChat';
import {Contact} from '../Contact/Contact';
import {ChatItemType, Routes, StoreType} from '../../../../types';
import {Router} from '../../../../modules';
import {chatController} from '../../../../services';
import AddChat from '../AddChat/AddChat';

class ContactList extends Block {
  constructor(props = {}) {
    super(props, 'div', 'chat-list');
  }

  render() {
    const profileLink = new Link({
      label: 'Профиль >',
      mode: 'secondary',
      className: 'ta-e',
      events: {
        click: () => {
          const router = new Router('.app');
          router.go(Routes.Profile);
        },
      },
    });
    const searchInput = new InputChat({
      className: 'chat-search',
      placeholder: 'Поиск',
      id: 'search',
    });
    const addChat = new AddChat();

    const contactBlocks = this.props?.data?.map((e: ChatItemType) => {
      return new Contact({
        id: e.id,
        title: e.title,
        text: e.last_message?.content,
        time: e.last_message?.time,
        count: e.unread_count,
        events: {
          click: () => {
            chatController.setActiveChat(e.id);
            chatController.connect(e.id);
          },
        },
      });
    });
    return compile(template, {
      profile: profileLink,
      search: searchInput,
      add: addChat,
      contacts: contactBlocks?.length ? contactBlocks : [],
      ...this.props,
    });
  }
}

function mapStateToProps(state: StoreType) {
  return {
    data: state.chat?.data,
    isLoading: state.chat?.isLoading,
    error: state.chat?.error,
    isError: !!state.chat?.error,
  };
}

export default connect(ContactList, mapStateToProps);
