import { Block, Link } from '../../components';
import { Aside, InfoRow } from './components';
import template from './template';
import { compile } from '../../utils';
import avatarUrl from '../../assets/images/default_avatar.png';
import { EventsType, HTMLElementEvent } from '../../types';
import { Mediator } from '../../modules';

export type ProfilePropsType = {
  isView: boolean;
  events?: EventsType;
};

export class Profile extends Block<ProfilePropsType> {
  constructor(props: ProfilePropsType) {
    super(props, 'div', 'profile');
  }

  handleSubmit(event: HTMLElementEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fromEntries = Object.fromEntries(formData);
    const {display_name, email, first_name, login, phone, second_name} = fromEntries;

    if (email && !Mediator.Instance.validateEmail(email as string)
    && first_name && !Mediator.Instance.validateUserName(first_name as string)
    && login && !Mediator.Instance.validateLogin(login as string)
    && phone && !Mediator.Instance.validatePhone(phone as string)
    && second_name && !Mediator.Instance.validateUserName(second_name as string)
    && display_name) {
      console.log(fromEntries);
    }
  }

  componentDidMount(): void {
    this.setProps({
      events: {
        submit: {
          selector: 'form',
          handler: this.handleSubmit
        },
      }
    });
  }

  render() {
    const { isView } = this.props;

    const aside = new Aside();

    const emailInfo = new InfoRow({
      label: 'Почта',
      value: 'pochta@yandex.ru',
      id: 'email',
      type: 'email',
      readonly: isView,
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          emailInfo.setProps({
            error: Mediator.Instance.validateEmail(event.target.value),
            value: event.target.value,
          });
        },
      }
    });

    const loginInfo = new InfoRow({
      label: 'Логин',
      value: 'ivanivanov',
      id: 'login',
      readonly: isView,
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          loginInfo.setProps({
            error: Mediator.Instance.validateLogin(event.target.value),
            value: event.target.value,
          });
        },
      }
    });

    const firstNameInfo = new InfoRow({
      label: 'Имя',
      value: 'Иван',
      id: 'first_name',
      readonly: isView,
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          firstNameInfo.setProps({
            error: Mediator.Instance.validateUserName(event.target.value),
            value: event.target.value,
          });
        },
      }
    });

    const secondNameInfo = new InfoRow({
      label: 'Фамилия',
      value: 'Иванов',
      id: 'second_name',
      readonly: isView,
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          secondNameInfo.setProps({
            error: Mediator.Instance.validateUserName(event.target.value),
            value: event.target.value,
          });
        },
      }
    });

    const displayNameInfo = new InfoRow({
      label: 'Имя в чате',
      value: 'Иван',
      id: 'display_name',
      readonly: isView,
    });
    
    const phoneInfo = new InfoRow({
      label: 'Телефон',
      value: '+79099673030',
      type: 'tel',
      id: 'phone',
      readonly: isView,
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          phoneInfo.setProps({
            error: Mediator.Instance.validatePhone(event.target.value),
            value: event.target.value,
          });
        },
      }
    });

    const changeDataLink = new Link({
      label: 'Изменить данные',
      path: '/',
      mode: 'border',
    });
    const changePasswordLink = new Link({
      label: 'Изменить пароль',
      path: '/',
      mode: 'border',
    });
    const logoutLink = new Link({ label: 'Выйти', path: '/', mode: 'danger' });

    return compile(template, {
      ...this.props,
      aside: aside,
      email: emailInfo,
      login: loginInfo,
      firstName: firstNameInfo,
      secondName: secondNameInfo,
      displayName: displayNameInfo,
      phone: phoneInfo,
      changeData: changeDataLink,
      changePassword: changePasswordLink,
      logout: logoutLink,
      src: avatarUrl,
    });
  }
}
