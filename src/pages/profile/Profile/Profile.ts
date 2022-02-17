import {Block, Link} from '../../../components';
import {Aside, InfoRow} from '../components';
import template from './template';
import {compile} from '../../../utils';
import avatarUrl from '../../../assets/images/default_avatar.png';
import {Routes} from '../../../types';

export class Profile extends Block {
  constructor() {
    super({}, 'div', 'profile');
  }

  render() {
    const aside = new Aside();

    const emailInfo = new InfoRow({
      label: 'Почта',
      value: 'pochta@yandex.ru',
      id: 'email',
      type: 'email',
      readonly: true,
    });

    const loginInfo = new InfoRow({
      label: 'Логин',
      value: 'ivanivanov',
      id: 'login',
      readonly: true,
    });

    const firstNameInfo = new InfoRow({
      label: 'Имя',
      value: 'Иван',
      id: 'first_name',
      readonly: true,
    });

    const secondNameInfo = new InfoRow({
      label: 'Фамилия',
      value: 'Иванов',
      id: 'second_name',
      readonly: true,
    });

    const displayNameInfo = new InfoRow({
      label: 'Имя в чате',
      value: 'Иван',
      id: 'display_name',
      readonly: true,
    });

    const phoneInfo = new InfoRow({
      label: 'Телефон',
      value: '+79099673030',
      type: 'tel',
      id: 'phone',
      readonly: true,
    });

    const changeDataLink = new Link({
      label: 'Изменить данные',
      path: Routes.Settings,
      mode: 'border',
    });
    const changePasswordLink = new Link({
      label: 'Изменить пароль',
      path: Routes.PasswordEditing,
      mode: 'border',
    });
    const logoutLink = new Link({
      label: 'Выйти',
      path: Routes.Login,
      mode: 'danger',
    });

    return compile(template, {
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
