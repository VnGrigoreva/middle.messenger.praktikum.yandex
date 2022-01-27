// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck 
import {Block} from '../../components';
import * as pug from 'pug';

type InputPropsType = {
  label: string;
  error?: string;
  id?: string;
  required?: boolean;
  pattern?: string;
  onkeypress?(): void;
  type?: string;
};

export class Input extends Block<InputPropsType> {
  constructor(props) {
		// Создаём враппер дом-элемент button
    super(props);
  }


  render() {
    const {type, id, required, pattern, onkeypress, label, error} = this.props;
		// В проекте должен быть ваш собственный шаблонизатор
    //return `<div>${this.props.text}</div>`;
    const template = `p #{label}`;
    // const renderFunction = pug.compile(template);
    return pug.render(template, {label});
  }
}

// function render(query, block) {
//   const root = document.querySelector(query);
//   root.appendChild(block.getContent());
//   return root;
// }

// const link = new Link({
//   path: '/', 
//   mode: 'primary',
//   label: 'Click me'
// });

// // app — это class дива в корне DOM
// render(".app", link);

// // Через секунду контент изменится сам, достаточно обновить пропсы
// setTimeout(() => {
//   link.setProps({
//     text: 'Click me, please',
//   });
// }, 1000);