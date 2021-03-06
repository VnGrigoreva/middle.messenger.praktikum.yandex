import {Block} from '../../../components';
import {Aside, InfoRow} from '../components';
import template from './template';
import {compile, connect, generateApiUrl} from '../../../utils';
import avatarUrl from '../../../assets/images/default_avatar.png';
import {
  EventsType,
  HTMLElementEvent,
  StoreType,
  UserItemType,
} from '../../../types';
import {Mediator} from '../../../modules';
import {userController} from '../../../services';

export type ProfilePropsType = {
  events?: EventsType;
  isLoading?: boolean;
  error?: string;
  data: UserItemType;
  isError: boolean;
};

export class Settings extends Block<ProfilePropsType> {
  constructor() {
    super({} as ProfilePropsType, 'div', 'profile');
  }

  private async handleSubmit(event: HTMLElementEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = Object.fromEntries(formData);
    const {display_name, email, first_name, login, phone, second_name} =
      formEntries;

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
      userController.setProfile(formEntries);
    }
  }

  private async changeAvatar(event: any) {
    const file = event.target.files[0];
    const fileData = new FormData();
    fileData.append('avatar', file);
    userController.setAvatar(fileData);
  }

  async componentDidMount() {
    if (!this.props?.data) {
      userController.getUser();
    }
    this.setProps({
      events: {
        submit: {
          selector: 'form',
          handler: this.handleSubmit.bind(this),
        },
        change: {
          selector: 'input[type="file"]',
          handler: (event) => this.changeAvatar.bind(this)(event),
        },
      },
    });
  }

  render() {
    const aside = new Aside();

    const emailInfo = new InfoRow({
      label: '??????????',
      value: this.props?.data?.email,
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
      label: '??????????',
      value: this.props?.data?.login,
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
      label: '??????',
      value: this.props?.data?.first_name,
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
      label: '??????????????',
      value: this.props?.data?.second_name,
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
      label: '?????? ?? ????????',
      value: this.props?.data?.display_name,
      id: 'display_name',
      readonly: false,
    });

    const phoneInfo = new InfoRow({
      label: '??????????????',
      value: this.props?.data?.phone,
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
      src: this.props?.data?.avatar
        ? generateApiUrl('resources') + this.props?.data?.avatar
        : avatarUrl,
      displayNameTitle: this.props?.data?.display_name,
      ...this.props,
    });
  }
}

function mapStateToProps(state: StoreType) {
  return {
    isLoading: state?.user?.isLoading,
    error: state?.user?.error,
    data: state?.user?.data,
    isError: !!state?.user?.error,
  };
}
export default connect(Settings, mapStateToProps);
