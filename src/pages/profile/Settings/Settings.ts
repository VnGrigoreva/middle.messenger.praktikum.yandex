import {Block} from '../../../components';
import {Aside, InfoRow} from '../components';
import template from './template';
import {compile} from '../../../utils';
import avatarUrl from '../../../assets/images/default_avatar.png';
import {EventsType, HTMLElementEvent, Routes} from '../../../types';
import {HTTPTransport, Mediator, Router} from '../../../modules';

export type ProfilePropsType = {
  events?: EventsType;
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
};

export class Settings extends Block<ProfilePropsType> {
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

  private async handleSubmit(event: HTMLElementEvent<HTMLFormElement>) {
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
      const api = new HTTPTransport();
      this.setProps({
        isLoading: true,
      });
      try {
        const response = await api.put('user/profile', {
          body: fromEntries,
        });
        if (response?.status === 200) {
          const router = new Router('.app');
          router.go(Routes.Profile);
        } else {
          const error = response?.data?.reason;
          throw new Error(error);
        }
      } catch (e) {
        const err = e as Error;
        this.setProps({isError: true, error: err.toString()});
      } finally {
        this.setProps({
          isLoading: false,
        });
      }
    }
  }

  async componentDidMount() {
    this.setProps({
      events: {
        submit: {
          selector: 'form',
          handler: this.handleSubmit.bind(this),
        },
      },
    });
    await this.getProfile();
  }

  render() {
    const aside = new Aside();

    const emailInfo = new InfoRow({
      label: 'Почта',
      value: this.data?.email,
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
      value: this.data?.login,
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
      value: this.data?.first_name,
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
      value: this.data?.second_name,
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
      value: this.data?.display_name,
      id: 'display_name',
      readonly: false,
    });

    const phoneInfo = new InfoRow({
      label: 'Телефон',
      value: this.data?.phone,
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
      aside: aside,
      email: emailInfo,
      login: loginInfo,
      firstName: firstNameInfo,
      secondName: secondNameInfo,
      displayName: displayNameInfo,
      phone: phoneInfo,
      src: avatarUrl,
      displayNameTitle: this.data?.display_name,
      ...this.props,
    });
  }
}
