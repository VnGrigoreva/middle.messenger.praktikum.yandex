import {Block} from '../../../components/Block/Block';
import template from './template';
import {Link} from '../../../components/Link/Link';
import {compile} from '../../../utils';
import {Routes} from '../../../types';
import {Router} from '../../../modules';

export class Error400Page extends Block {
  constructor() {
    super();
  }

  render() {
    const backLink = new Link({
      label: 'Назад к чатам',
      mode: 'primary',
      events: {
        click: () => {
          const router = new Router('.app');
          router.go(Routes.Chat);
        },
      },
    });

    return compile(template, {
      backLink: backLink,
      ...this.props,
    });
  }
}
