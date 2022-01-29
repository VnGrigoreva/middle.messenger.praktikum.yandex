import { Block } from '../Block/Block';
import template from './template';
import { Link } from '../Link/Link';
import compile from '../../utils/compile';

type ErrorPagePropsType = {
  code: string;
  message: string;
};

export class ErrorPage extends Block<ErrorPagePropsType> {
  constructor(props: ErrorPagePropsType) {
    super(props);
  }

  render() {
    const backLink = new Link({
      label: 'Назад к чатам',
      path: '/',
      mode: 'primary'
    });

    return compile(template, {
      backLink: backLink,
      ...this.props
    });
  }
}
