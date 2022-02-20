import {Block} from '../../../../components';
import template from './template';
import {compile} from '../../../../utils';
import {EventsType} from '../../../../types';

type ButtonImagePropsType = {
  src: string;
  events?: EventsType;
};

export class ButtonImage extends Block<ButtonImagePropsType> {
  constructor(props: ButtonImagePropsType) {
    super(props, 'div', 'button-img');
  }

  render() {
    return compile(template, {...this.props});
  }
}
