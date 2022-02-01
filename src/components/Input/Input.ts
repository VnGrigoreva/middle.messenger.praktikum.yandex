import { Block } from '../Block/Block';
import template from './template';
import { compile } from '../../utils';
import { EventsType } from '../../types';

type InputPropsType = {
  label: string;
  error?: string;
  id: string;
  required?: boolean;
  type?: string;
  events?: EventsType;
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
