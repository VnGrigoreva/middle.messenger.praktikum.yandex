import template from './template';
import {Input, Block, Link} from '../../../components';
import {compile, connect} from '../../../utils';
import {Mediator} from '../../../modules';
import {HTMLElementEvent, Routes} from '../../../types';
import {authController} from '../../../services';

export class Registration extends Block {
  password = '';

  constructor() {
    super({}, 'div', 'authorization');
  }

  private async handleSubmit(event: HTMLElementEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fromEntries = Object.fromEntries(formData);
    const {
      email,
      first_name,
      login,
      password,
      phone,
      second_name,
      verify_password,
    } = fromEntries;

    if (
      email &&
      !Mediator.Instance.validateEmail(email as string) &&
      first_name &&
      !Mediator.Instance.validateUserName(first_name as string) &&
      login &&
      !Mediator.Instance.validateLogin(login as string) &&
      password &&
      !Mediator.Instance.validatePassword(password as string) &&
      password === verify_password &&
      phone &&
      !Mediator.Instance.validatePhone(phone as string) &&
      second_name &&
      !Mediator.Instance.validateUserName(second_name as string)
    ) {
      const data = {email, first_name, login, password, phone, second_name};

      authController.signup(data);
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
    const inputEmail = new Input({
      value: 'pochta@pochta.ru',
      label: 'Почта',
      id: 'email',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputEmail.setProps({
            error: Mediator.Instance.validateEmail(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const inputLogin = new Input({
      value: 'BlackHeart',
      label: 'Логин',
      id: 'login',
      autocomplete: 'username',
      maxlength: '20',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputLogin.setProps({
            error: Mediator.Instance.validateLogin(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const inputFirstName = new Input({
      value: 'Serkan',
      label: 'Имя',
      id: 'first_name',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputFirstName.setProps({
            error: Mediator.Instance.validateUserName(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const inputSecondName = new Input({
      value: 'Baraban',
      label: 'Фамилия',
      id: 'second_name',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputSecondName.setProps({
            error: Mediator.Instance.validateUserName(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const inputPhone = new Input({
      value: '+71111111111',
      label: 'Телефон',
      id: 'phone',
      type: 'tel',
      maxlength: '15',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputPhone.setProps({
            error: Mediator.Instance.validatePhone(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const inputPassword = new Input({
      value: 'zxcD_231',
      label: 'Пароль',
      id: 'password',
      type: 'password',
      autocomplete: 'new-password',
      maxlength: '40',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          this.password = event.target.value;
          inputPassword.setProps({
            error: Mediator.Instance.validatePassword(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const inputVerifyPassword = new Input({
      value: 'zxcD_231',
      label: 'Пароль (еще раз)',
      id: 'verify_password',
      type: 'password',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputVerifyPassword.setProps({
            error: Mediator.Instance.comparePasswords(
              this.password,
              event.target.value
            ),
            value: event.target.value,
          });
        },
      },
    });

    const entryLink = new Link({
      label: 'Войти',
      path: Routes.Login,
      mode: 'primary',
    });

    return compile(template, {
      email: inputEmail,
      login: inputLogin,
      firstName: inputFirstName,
      secondName: inputSecondName,
      phone: inputPhone,
      password: inputPassword,
      verifyPassword: inputVerifyPassword,
      entry: entryLink,
      ...this.props,
    });
  }
}

function mapRegistrationStateProps(state: any) {
  return {
    isLoading: state.registration?.isLoading,
    isError: state.registration?.isError,
    error: state.registration?.error,
    isSuccess: state.registration?.isSuccess,
    success: state.registration?.success,
  };
}

export default connect(Registration, mapRegistrationStateProps);
