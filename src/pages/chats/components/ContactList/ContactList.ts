import {Block, Link} from '../../../../components';
import template from './template';
import {compile, connect} from '../../../../utils';
import {InputChat} from '../InputChat/InputChat';
import {Contact} from '../Contact/Contact';
import {Routes} from '../../../../types';
import {Router} from '../../../../modules';
import chatController from '../../../../services/chat/chatController';
import {AddChat} from '../AddChat/AddChat';

class ContactList extends Block {
  constructor() {
    super({}, 'div', 'chat-list');
  }

  componentDidMount() {
    chatController.getChats();
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
    const contactBlocks = this.props?.data?.map((e: any) => {
      return new Contact({
        id: e?.id,
        title: e?.title,
        userName:
          e?.last_message?.user?.first_name +
          ' ' +
          e?.last_message?.user?.second_name,
        text: e?.last_message?.content,
        time: e?.last_message?.time,
      });
    });
    return compile(template, {
      profile: profileLink,
      search: searchInput,
      add: addChat,
      contacts: contactBlocks?.length ? contactBlocks : [],
    });
  }
}

function mapStateToProps(state: any) {
  return {
    data: state.chat?.data,
    isLoading: state.chat?.isLoading,
    error: state.chat?.error,
    isError: !!state.chat?.error,
  };
}

export default connect(ContactList, mapStateToProps);
