import {Block} from '../../../components';
import {Aside, InfoRow} from '../components';
import template from './template';
import {compile, connect, generateApiUrl} from '../../../utils';
import {HTMLElementEvent, StoreType} from '../../../types';
import {Mediator} from '../../../modules';
import defaultAvatar from '../../../assets/images/default_avatar.png';
import {userController} from '../../../services';

class PasswordEditing extends Block {
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
      userController.setPassword({oldPassword, newPassword});
    }
  }

  componentDidMount(): void {
    if (!this.props?.data) {
      userController.getUser();
    }
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
      src: this.props?.data?.avatar
        ? generateApiUrl('resources') + this.props?.data?.avatar
        : defaultAvatar,
      ...this.props,
    });
  }
}

function mapStateToProps(state: StoreType) {
  return {
    isLoading: state?.user?.isLoading,
    error: state?.user?.error,
    isError: !!state?.user?.error,
    data: state?.user?.data,
  };
}

export default connect(PasswordEditing, mapStateToProps);
