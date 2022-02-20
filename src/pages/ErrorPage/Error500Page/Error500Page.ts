import {Block} from '../../../components/Block/Block';
import template from './template';
import {Link} from '../../../components/Link/Link';
import {compile} from '../../../utils';
import {Routes} from '../../../types';

export class Error500Page extends Block {
  constructor() {
    super();
  }

  render() {
    const backLink = new Link({
      label: 'Назад к чатам',
      path: Routes.Chat,
      mode: 'primary',
    });

    return compile(template, {
      backLink: backLink,
      ...this.props,
    });
  }
}