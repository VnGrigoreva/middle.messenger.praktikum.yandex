import {Block, Link} from '../../../components';
import {Aside, InfoRow} from '../components';
import template from './template';
import {compile, connect, generateApiUrl} from '../../../utils';
import defaultAvatar from '../../../assets/images/default_avatar.png';
import {Routes} from '../../../types';
import authController from '../../../services/auth/authController';
import {userController} from '../../../services';
class Profile extends Block {
  constructor() {
    super({}, 'div', 'profile');
    userController.getUser();
  }

  render() {
    const aside = new Aside();

    const emailInfo = new InfoRow({
      label: 'Почта',
      value: this.props?.data?.email,
      id: 'email',
      type: 'email',
      readonly: true,
    });

    const loginInfo = new InfoRow({
      label: 'Логин',
      value: this.props?.data?.login,
      id: 'login',
      readonly: true,
    });

    const firstNameInfo = new InfoRow({
      label: 'Имя',
      value: this.props?.data?.first_name,
      id: 'first_name',
      readonly: true,
    });

    const secondNameInfo = new InfoRow({
      label: 'Фамилия',
      value: this.props?.data?.second_name,
      id: 'second_name',
      readonly: true,
    });

    const displayNameInfo = new InfoRow({
      label: 'Имя в чате',
      value: this.props?.data?.display_name,
      id: 'display_name',
      readonly: true,
    });

    const phoneInfo = new InfoRow({
      label: 'Телефон',
      value: this.props?.data?.phone,
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
      path: '#',
      mode: 'danger',
      events: {
        click: () => {
          authController.logout();
        },
      },
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
      src: this.props?.data?.avatar
        ? generateApiUrl('resources') + this.props?.data?.avatar
        : defaultAvatar,
      displayNameTitle: this.props?.data?.display_name,
      ...this.props,
    });
  }
}

function mapStateToProps(state: any) {
  return {
    data: state.user?.data,
    isLoading: state.user?.isLoading,
    error: state.user?.error,
    isError: !!state.user?.error,
  };
}

export default connect(Profile, mapStateToProps);
