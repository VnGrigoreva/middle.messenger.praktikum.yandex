import {Block, Input, Link} from '../../../components';
import template from './template';
import {compile, connect} from '../../../utils';
import {HTMLElementEvent, Routes, StoreType} from '../../../types';
import {Mediator, Router} from '../../../modules';
import {authController} from '../../../services';

export class Login extends Block {
  constructor() {
    super({}, 'div', 'authorization');
  }

  private async handleSubmit(event: HTMLElementEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fromEntries = Object.fromEntries(formData);
    const {login, password} = fromEntries;

    if (
      login &&
      !Mediator.Instance.validateLogin(login as string) &&
      password
    ) {
      authController.signin(fromEntries);
    }
  }

  componentDidMount(): void {
    this.setProps({
      events: {
        submit: {
          selector: 'form',
          handler: this.handleSubmit.bind(this),
        },
      },
    });
  }

  render() {
    const inputLogin = new Input({
      label: 'Логин',
      id: 'login',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputLogin.setProps({
            error: Mediator.Instance.validateLogin(event.target.value),
            value: event.target.value,
          });
        },
      },
    });
    const inputPas = new Input({
      label: 'Пароль',
      id: 'password',
      type: 'password',
    });
    const registrationLink = new Link({
      label: 'Нет аккаунта',
      mode: 'primary',
      className: 'link',
      events: {
        click: () => {
          const router = new Router('.app');
          router.go(Routes.Registration);
        },
      },
    });

    return compile(template, {
      login: inputLogin,
      password: inputPas,
      registration: registrationLink,
      ...this.props,
    });
  }
}

function mapAuthStateToProps(state: StoreType) {
  return {
    isLoading: state?.auth?.isLoading,
    error: state?.auth?.error,
  };
}

export default connect(Login, mapAuthStateToProps);
