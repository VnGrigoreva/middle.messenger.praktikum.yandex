import {Block, Input} from '../../../../components';
import template from './template';
import {compile} from '../../../../utils';

export class AddChat extends Block {
  constructor() {
    super({}, 'div');
  }

  // componentDidMount(): void {
  //   this.setProps({
  //     events: {
  //       submit: {
  //         selector: 'form',
  //         handler: this.handleSubmit.bind(this),
  //       },
  //     },
  //   });
  // }

  render() {
    const inputTitle = new Input({
      label: 'Заголовок чата',
      id: 'title',
    });
    return compile(template, {title: inputTitle, ...this.props});
  }
}
