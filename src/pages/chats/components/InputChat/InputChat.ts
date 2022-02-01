import { Block } from '../../../../components';
import template from './template';
import { compile } from '../../../../utils';

type InputChatPropsType = {
  className: 'chat-search' | 'chat-footer__message';
  placeholder: string;
  id: string;
  error?: string;
  value?: string;
  events?: any;
};

export class InputChat extends Block<InputChatPropsType> {
  constructor(props: InputChatPropsType) {
    super(props, 'div', 'w100');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
