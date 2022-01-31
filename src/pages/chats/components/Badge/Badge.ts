import { Block } from '../../../../components';
import template from './template';
import { compile } from '../../../../utils';

type BadgePropsType = {
  count: number;
};

export class Badge extends Block<BadgePropsType> {
  constructor(props: BadgePropsType) {
    super(props, 'div', 'badge');
  }

  render() {
    return compile(template, { ...this.props });
  }
}
