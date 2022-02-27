import {Block, Link} from '../../../../components';
import template from './template';
import {compile} from '../../../../utils';
import {Badge} from '../Badge/Badge';
import {chatController} from '../../../../services';
import {EventsType} from '../../../../types';

type ContactPropsType = {
  text: string;
  time: string;
  title: string;
  id: string;
  count: number;
  events: EventsType;
};

export class Contact extends Block<ContactPropsType> {
  constructor(props: ContactPropsType) {
    super(props, 'div', 'contact');
  }

  render() {
    const badge =
      this.props.count > 0 ? new Badge({count: this.props.count}) : undefined;
    const deleteLink = new Link({
      label: 'Х',
      mode: 'secondary',
      className: 'pr-10',
      events: {
        click: () => {
          console.log('list', this.props?.id);
          chatController.deleteChat({chatId: this.props?.id});
          chatController.getChats();
        },
      },
    });
    return compile(template, {...this.props, badge: badge, del: deleteLink});
  }
}
