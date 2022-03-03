import {Block} from '../../../../components';
import template from './template';
import {compile} from '../../../../utils';
import backUrl from '../../../../assets/images/back.png';
import {Router} from '../../../../modules';

export class Aside extends Block {
  constructor() {
    super({}, 'div', 'aside');
  }

  componentDidMount(): void {
    this.setProps({
      events: {
        click: () => {
          const router = new Router('.app');
          router.back();
        },
      },
    });
  }

  render() {
    return compile(template, {
      src: backUrl,
    });
  }
}
