import { Block } from '../../components';
import template from './template';
import { compile } from '../../utils';

type InputPropsType = {
  label: string;
  error?: string;
  id: string;
  required?: boolean;
  type?: string;
  events?: any;
  autocomplete?: 'new-password' | 'username';
  value?: string;
  maxlength?: string;
};

export class Input extends Block<InputPropsType> {
  constructor(props: InputPropsType) {
    super(props, 'div', 'input-container');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
