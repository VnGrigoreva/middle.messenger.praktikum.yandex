import { Block } from '../../components';
import template from './template';
import { compile } from '../../utils';

type LinkPropsType = {
  label: string;
  path: string;
  mode: 'primary' | 'secondary' | 'danger' | 'border';
};

export class Link extends Block<LinkPropsType> {
  constructor(props: LinkPropsType) {
    super(props, 'div', 'p-10');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
