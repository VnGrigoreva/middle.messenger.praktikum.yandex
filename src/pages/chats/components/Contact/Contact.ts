import {Block} from '../../../../components';
import template from './template';
import {compile} from '../../../../utils';
import {Badge} from '../Badge/Badge';

type ContactPropsType = {
  userName: string;
  text: string;
  time: string;
};

export class Contact extends Block<ContactPropsType> {
  constructor(props: ContactPropsType) {
    super(props, 'div', 'contact');
  }

  render() {
    const badge = new Badge({count: 4});
    return compile(template, {...this.props, badge: badge});
  }
}
