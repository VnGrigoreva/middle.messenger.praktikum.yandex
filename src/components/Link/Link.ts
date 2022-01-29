import { Block } from '../../components';
import template from './template';
import compile from '../../utils/compile';

type LinkPropsType = {
  label: string;
  path: string;
  mode: 'primary' | 'secondar' | 'danger';
};

export class Link extends Block<LinkPropsType> {
  constructor(props: LinkPropsType) {
    super(props);
  }

  render() {
    return compile(template, { ...this.props });
  }
}