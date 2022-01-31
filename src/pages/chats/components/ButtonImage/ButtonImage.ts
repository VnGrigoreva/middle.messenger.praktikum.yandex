import { Block } from '../../../../components';
import template from './template';
import { compile } from '../../../../utils';

type ButtonImagePropsType = {
  src: string;
};

export class ButtonImage extends Block<ButtonImagePropsType> {
  constructor(props: ButtonImagePropsType) {
    super(props, 'div', 'button-img');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
