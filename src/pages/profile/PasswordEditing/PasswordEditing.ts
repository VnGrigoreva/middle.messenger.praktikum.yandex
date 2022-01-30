import { Block } from '../../../components';
import { Aside, InfoRow } from '../components';
import template from './template';
import { compile } from '../../../utils';

export class PasswordEditing extends Block {
  constructor() {
    super({}, 'div', 'profile');
  }

  render() {
    const aside = new Aside();
    const oldPasswordInfo = new InfoRow({
      label: 'Старый пароль',
      id: 'old_password',
      type: 'password',
    });
    const newPasswordInfo = new InfoRow({
      label: 'Новый пароль',
      id: 'new_password',
      type: 'password',
    });
    const verifynewPasswordInfo = new InfoRow({
      label: 'Повторите новый пароль',
      id: 'new_password',
      type: 'password',
    });

    return compile(template, {
      aside: aside,
      oldPassword: oldPasswordInfo,
      newPassword: newPasswordInfo,
      verifynewPassword: verifynewPasswordInfo, 
    });
  }
}
