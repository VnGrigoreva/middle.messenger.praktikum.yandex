import { Block } from '../../../../components';
import template from './template';
import { compile } from '../../../../utils';

export class Aside extends Block {
  constructor() {
    super({}, 'div', 'aside');
  }

  render() {
    return compile(template);
  }
}
