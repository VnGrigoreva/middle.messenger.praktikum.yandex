import {Block} from '../../../components';
import {Aside, InfoRow} from '../components';
import template from './template';
import {compile} from '../../../utils';
import {HTMLElementEvent, Routes} from '../../../types';
import {HTTPTransport, Mediator, Router} from '../../../modules';
import avatar from '../../../assets/images/default_avatar.png';

export class PasswordEditing extends Block {
  constructor() {
    super({}, 'div', 'profile');
  }

  private newPassword = '';

  private async handleSubmit(event: HTMLElementEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fromEntries = Object.fromEntries(formData);
    const {oldPassword, newPassword, verifyNewPassword} = fromEntries;

    if (
      oldPassword &&
      newPassword &&
      !Mediator.Instance.validatePassword(newPassword as string) &&
      newPassword === verifyNewPassword
    ) {
      const api = new HTTPTransport();
      this.setProps({
        isLoading: true,
        isError: false,
      });
      try {
        const response = await api.put('/user/password', {
          body: {oldPassword, newPassword},
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
    const aside = new Aside();

    const oldPasswordInfo = new InfoRow({
      label: 'Старый пароль',
      id: 'oldPassword',
      type: 'password',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          oldPasswordInfo.setProps({
            error: Mediator.Instance.validatePassword(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const newPasswordInfo = new InfoRow({
      label: 'Новый пароль',
      id: 'newPassword',
      type: 'password',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          this.newPassword = event.target.value;
          newPasswordInfo.setProps({
            error: Mediator.Instance.validatePassword(event.target.value),
            value: event.target.value,
          });
        },
      },
    });

    const verifynewPasswordInfo = new InfoRow({
      label: 'Повторите новый пароль',
      id: 'verifyNewPassword',
      type: 'password',
      events: {
        change: (event: HTMLElementEvent<HTMLInputElement>) => {
          verifynewPasswordInfo.setProps({
            error: Mediator.Instance.comparePasswords(
              this.newPassword,
              event.target.value
            ),
            value: event.target.value,
          });
        },
      },
    });

    return compile(template, {
      aside: aside,
      oldPassword: oldPasswordInfo,
      newPassword: newPasswordInfo,
      verifynewPassword: verifynewPasswordInfo,
      src: avatar,
      ...this.props,
    });
  }
}
