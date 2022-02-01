import template from './template';
import { Input, Block, Link } from '../../../components';
import { compile } from '../../../utils';
import { Mediator } from '../../../modules/mediator';
import { HTMLElementEvent } from '../../../types';

export class Registration extends Block {
  password = '';

  constructor() {
    super({}, 'div', 'authorization');
  }

  componentDidMount(): void {
    const handleSubmit = (event: HTMLElementEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log(event.target);


      const formData = new FormData(event.target);
      const fromEntries = Object.fromEntries(formData);
      const {email, first_name, login, password, phone, second_name, verify_password} = fromEntries;

      if (email && !Mediator.Instance.validateEmail(email as string)
      && first_name && !Mediator.Instance.validateUserName(first_name as string)
      && login && !Mediator.Instance.validateLogin(login as string)
      && password && !Mediator.Instance.validatePassword(password as string) && password === verify_password
      && phone && !Mediator.Instance.validatePhone(phone as string)
      && second_name && !Mediator.Instance.validateUserName(second_name as string)) {
        console.log({email, first_name, login, password, phone, second_name});
      }

      return false;
    };

    this.setProps({
      events: {
        submit: {
          selector: 'form',
          handler: handleSubmit
        },
      }
    });
  }

  render() {
    const inputEmail = new Input({
      label: 'Почта',
      id: 'email',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputEmail.setProps({
            error: Mediator.Instance.validateEmail(event.target.value),
            value: event.target.value,
          });
        },
      }
    });

    const inputLogin = new Input({ 
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
      }
    });

    const inputFirstName = new Input({ 
      label: 'Имя', 
      id: 'first_name',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputFirstName.setProps({
            error: Mediator.Instance.validateUserName(event.target.value),
            value: event.target.value,
          });
        },
      }
    });

    const inputSecondName = new Input({ 
      label: 'Фамилия', 
      id: 'second_name',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputSecondName.setProps({
            error: Mediator.Instance.validateUserName(event.target.value),
            value: event.target.value,
          });
        },
      }
    });

    const inputPhone = new Input({
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
      }
    });

    const inputPassword = new Input({
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
      label: 'Пароль (еще раз)',
      id: 'verify_password',
      type: 'password',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          inputVerifyPassword.setProps({
            error: Mediator.Instance.comparePasswords(this.password ,event.target.value),
            value: event.target.value,
          });
        },
      }
    });

    const entryLink = new Link({
      label: 'Войти',
      path: '/',
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
    });
  }
}
