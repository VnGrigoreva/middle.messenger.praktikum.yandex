import {Block, Link} from '../../../components';
import {Aside, InfoRow} from '../components';
import template from './template';
import {compile} from '../../../utils';
import avatarUrl from '../../../assets/images/default_avatar.png';
import {Routes} from '../../../types';
import {HTTPTransport, Router} from '../../../modules';
import config from '../../../utils/config';

export class Profile extends Block {
  private data = null;
  constructor() {
    super({}, 'div', 'profile');
  }

  async getProfile() {
    const api = new HTTPTransport();
    this.setProps({
      isLoading: true,
    });
    try {
      const response = await api.get('auth/user');
      if (response?.status === 200) {
        this.data = response?.data;
      } else {
        const error = response?.data?.reason;
        throw new Error(error);
      }
    } catch (e) {
      const err = e as Error;
      this.setProps({isError: true, error: err.toString()});
      this.data = null;
    } finally {
      this.setProps({
        isLoading: false,
      });
    }
  }

  async componentDidMount() {
    await this.getProfile();
  }

  render() {
    const aside = new Aside();

    const emailInfo = new InfoRow({
      label: 'Почта',
      value: this.data?.email,
      id: 'email',
      type: 'email',
      readonly: true,
    });

    const loginInfo = new InfoRow({
      label: 'Логин',
      value: this.data?.login,
      id: 'login',
      readonly: true,
    });

    const firstNameInfo = new InfoRow({
      label: 'Имя',
      value: this.data?.first_name,
      id: 'first_name',
      readonly: true,
    });

    const secondNameInfo = new InfoRow({
      label: 'Фамилия',
      value: this.data?.second_name,
      id: 'second_name',
      readonly: true,
    });

    const displayNameInfo = new InfoRow({
      label: 'Имя в чате',
      value: this.data?.display_name,
      id: 'display_name',
      readonly: true,
    });

    const phoneInfo = new InfoRow({
      label: 'Телефон',
      value: this.data?.phone,
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
        click: async () => {
          const api = new HTTPTransport();
          this.setProps({
            isLoading: true,
          });
          try {
            const response = await api.post('/auth/logout');
            if (response?.status === 200) {
              this.data = response?.data;
              const router = new Router('.app');
              router.go(Routes.Login);
            } else {
              const error = response?.data?.reason;
              throw new Error(error);
            }
          } catch (e) {
            const err = e as Error;
            this.setProps({isError: true, error: err.toString()});
            this.data = null;
          } finally {
            this.setProps({
              isLoading: false,
            });
          }
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
      src: this.data?.avatar
        ? 'https://ya-praktikum.tech/api/v2/uploads' + this.data?.avatar
        : avatarUrl,
      displayNameTitle: this.data?.display_name,
      ...this.props,
    });
  }
}
