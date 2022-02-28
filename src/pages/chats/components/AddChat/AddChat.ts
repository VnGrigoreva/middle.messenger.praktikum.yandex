import {Block, Input} from '../../../../components';
import template from './template';
import {compile, connect} from '../../../../utils';
import {chatController} from '../../../../services';
import {HTMLElementEvent, StoreType} from '../../../../types';

class AddChat extends Block {
  constructor() {
    super({}, 'div');
  }

  handleSubmit(event: HTMLElementEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const fromEntries = Object.fromEntries(formData);
    chatController.addChats(fromEntries);
    chatController.getChats();
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
    const inputTitle = new Input({
      label: 'Заголовок чата',
      id: 'title',
    });
    return compile(template, {title: inputTitle, ...this.props});
  }
}

function mapStateToProps(state: StoreType) {
  return {
    isLoading: state.chat?.isLoading,
    error: state.chat?.error,
    isError: !!state.chat?.error,
  };
}

export default connect(AddChat, mapStateToProps);
