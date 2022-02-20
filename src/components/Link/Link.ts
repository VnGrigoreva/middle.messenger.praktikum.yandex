import {Block} from '../Block/Block';
import template from './template';
import {compile} from '../../utils';

type LinkPropsType = {
  label: string;
  path: string;
  mode: 'primary' | 'secondary' | 'danger' | 'border';
  className?: string;
};

export class Link extends Block<LinkPropsType> {
  constructor(props: LinkPropsType) {
    const {className, ...otherProps} = props;
    super(otherProps, 'div', className ? `p-10 ${className}` : 'p-10');
  }

  render() {
    return compile(template, {...this.props});
  }
}
