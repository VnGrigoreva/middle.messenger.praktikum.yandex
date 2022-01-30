import { Block, Link } from '../../../../components';
import template from './template';
import { compile } from '../../../../utils';
import { InputChat } from '../InputChat/InputChat';
import { Contact } from '../Contact/Contact';

export class ContactList extends Block {
  constructor() {
    super({}, 'div', 'chat-list');
  }

  render() {
    const profileLink = new Link({path: '/', label: 'Профиль >', mode: 'secondary'})
    const searchInput = new InputChat({
      className: 'chat-search',
      placeholder: 'Поиск',
      id: 'search'
    });
    const contactBlock = new Contact({
      userName: 'Андрей',
      text: 'Some short text',
      time: '14:07'
    });
    return compile(template, { profile: profileLink, search: searchInput, contact: contactBlock });
  }
}