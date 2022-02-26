import {Block} from '../../../../components';
import template from './template';
import {compile} from '../../../../utils';
import {Badge} from '../Badge/Badge';

type ContactPropsType = {
  text: string;
  time: string;
  title: string;
  id: string;
  count: number;
};

export class Contact extends Block<ContactPropsType> {
  constructor(props: ContactPropsType) {
    super(props, 'div', 'contact');
  }

  render() {
    const badge =
      this.props.count > 0 ? new Badge({count: this.props.count}) : undefined;
    return compile(template, {...this.props, badge: badge});
  }
}
