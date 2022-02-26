import {Block, Link} from '../../../../components';
import template from './template';
import {compile} from '../../../../utils';
import {InputChat} from '../InputChat/InputChat';
import {Contact} from '../Contact/Contact';
import {Routes} from '../../../../types';

export class ContactList extends Block {
  constructor() {
    super({}, 'div', 'chat-list');
  }

  render() {
    const profileLink = new Link({
      path: Routes.Profile,
      label: 'Профиль >',
      mode: 'secondary',
    });
    const searchInput = new InputChat({
      className: 'chat-search',
      placeholder: 'Поиск',
      id: 'search',
    });
    const contactBlocks = [
      new Contact({
        userName: 'Андрей',
        text: 'Some short text',
        time: '14:07',
      }),
      new Contact({
        userName: 'Ваня',
        text: 'Some short text1',
        time: '14:09',
      }),
      new Contact({
        userName: 'Петя',
        text: 'Some short text2',
        time: '16:09',
      }),
    ];
    return compile(template, {
      profile: profileLink,
      search: searchInput,
      contacts: contactBlocks,
    });
  }
}
