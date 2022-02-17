import {Block} from '../../../../components';
import template from './template';
import {compile} from '../../../../utils';
import backUrl from '../../../../assets/images/back.png';

export class Aside extends Block {
  constructor() {
    super({}, 'div', 'aside');
  }

  render() {
    return compile(template, {src: backUrl});
  }
}
