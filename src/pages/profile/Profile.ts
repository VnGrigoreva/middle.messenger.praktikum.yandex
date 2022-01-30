import { Block, Link } from '../../components';
import { Aside, InfoRow } from './components';
import template from './template';
import { compile } from '../../utils';
import avatarUrl from '../../assets/images/default_avatar.png';

export type ProfilePropsType = {
  isView: boolean;
};

export class Profile extends Block<ProfilePropsType> {
  constructor(props: ProfilePropsType) {
    super(props, 'div', 'profile');
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
    });
    const loginInfo = new InfoRow({
      label: 'Логин',
      value: 'ivanivanov',
      id: 'login',
      readonly: isView,
    });
    const firstNameInfo = new InfoRow({
      label: 'Имя',
      value: 'Иван',
      id: 'first_name',
      readonly: isView,
    });
    const secondNameInfo = new InfoRow({
      label: 'Фамилия',
      value: 'Иванов',
      id: 'second_name',
      readonly: isView,
    });
    const displayNameInfo = new InfoRow({
      label: 'Имя в чате',
      value: 'Иван',
      id: 'display_name',
      readonly: isView,
    });
    const phoneInfo = new InfoRow({
      label: 'Телефон',
      value: '+7 (909) 967 30 30',
      type: 'tel',
      id: 'phone',
      readonly: isView,
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
