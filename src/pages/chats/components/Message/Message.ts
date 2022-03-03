import {Block} from '../../../../components';
import template from './template';
import {compile} from '../../../../utils';

type MessagePropsType = {
  mode: 'left' | 'right';
  text: string;
};

export class Message extends Block<MessagePropsType> {
  constructor(props: MessagePropsType) {
    super(props);
  }

  render() {
    return compile(template, {...this.props});
  }
}
