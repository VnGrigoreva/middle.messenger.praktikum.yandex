import { Block } from '../../../components';
import { Aside, InfoRow } from '../components';
import template from './template';
import { compile } from '../../../utils';
import { HTMLElementEvent } from '../../../types';
import { Mediator } from '../../../modules';
import avatar from '../../../assets/images/default_avatar.png';

export class PasswordEditing extends Block {
  constructor() {
    super({}, 'div', 'profile');
  }

  private newPassword = '';

  private handleSubmit(event: HTMLElementEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fromEntries = Object.fromEntries(formData);
    const { new_password, verify_new_password } = fromEntries;

    if (
      new_password &&
      !Mediator.Instance.validatePassword(new_password as string) &&
      new_password === verify_new_password
    ) {
      console.log({ new_password });
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

    const oldPasswordInfo = new InfoRow({
      label: 'Старый пароль',
      id: 'old_password',
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
      id: 'new_password',
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
      id: 'verify_new_password',
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
    });
  }
}
