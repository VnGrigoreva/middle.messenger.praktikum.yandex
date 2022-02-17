import {Block, Link} from '../../../components';
import {Aside, InfoRow} from '../components';
import template from './template';
import {compile} from '../../../utils';
import avatarUrl from '../../../assets/images/default_avatar.png';
import {EventsType, HTMLElementEvent, Routes} from '../../../types';
import {Mediator, Router} from '../../../modules';

export type ProfilePropsType = {
  events?: EventsType;
};

export class Settings extends Block<ProfilePropsType> {
  constructor() {
    super({}, 'div', 'profile');
  }

  private handleSubmit(event: HTMLElementEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fromEntries = Object.fromEntries(formData);
    const {display_name, email, first_name, login, phone, second_name} =
      fromEntries;

    if (
      email &&
      !Mediator.Instance.validateEmail(email as string) &&
      first_name &&
      !Mediator.Instance.validateUserName(first_name as string) &&
      login &&
      !Mediator.Instance.validateLogin(login as string) &&
      phone &&
      !Mediator.Instance.validatePhone(phone as string) &&
      second_name &&
      !Mediator.Instance.validateUserName(second_name as string) &&
      display_name
    ) {
      console.warn(fromEntries);

      const router = new Router('.app');
      router.go(Routes.Profile);
    }
  }

  componentDidMount(): void {
    this.setProps({
      events: {
        submit: {
          selector: 'form',
          handler: this.handleSubmit,
        },
      },
    });
  }

  render() {
    const aside = new Aside();

    const emailInfo = new InfoRow({
      label: 'Почта',
      value: 'pochta@yandex.ru',
      id: 'email',
      type: 'email',
      readonly: false,
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          emailInfo.setProps({
            error: Mediator.Instance.validateEmail(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const loginInfo = new InfoRow({
      label: 'Логин',
      value: 'ivanivanov',
      id: 'login',
      readonly: false,
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          loginInfo.setProps({
            error: Mediator.Instance.validateLogin(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const firstNameInfo = new InfoRow({
      label: 'Имя',
      value: 'Иван',
      id: 'first_name',
      readonly: false,
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          firstNameInfo.setProps({
            error: Mediator.Instance.validateUserName(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const secondNameInfo = new InfoRow({
      label: 'Фамилия',
      value: 'Иванов',
      id: 'second_name',
      readonly: false,
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          secondNameInfo.setProps({
            error: Mediator.Instance.validateUserName(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const displayNameInfo = new InfoRow({
      label: 'Имя в чате',
      value: 'Иван',
      id: 'display_name',
      readonly: false,
    });

    const phoneInfo = new InfoRow({
      label: 'Телефон',
      value: '+79099673030',
      type: 'tel',
      id: 'phone',
      readonly: false,
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          phoneInfo.setProps({
            error: Mediator.Instance.validatePhone(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    return compile(template, {
      ...this.props,
      aside: aside,
      email: emailInfo,
      login: loginInfo,
      firstName: firstNameInfo,
      secondName: secondNameInfo,
      displayName: displayNameInfo,
      phone: phoneInfo,
      src: avatarUrl,
    });
  }
}
