// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-nocheck
// import * as pug from 'pug';
// import { View } from '../view/view';
// import { Input } from './Input';

// export class Page extends View {
//   constructor(props?) {
//     // Создаём враппер дом-элемент button
//     super(props);
//   }

//   renderInput(label, id, type) {
//     const input = new Input({ label, id, type });
//     return input.render();
//   }

//   submit(event) {}

//   render() {
//     const { type, id, required, pattern, onkeypress, label, error } =
//       this.props;
//     // В проекте должен быть ваш собственный шаблонизатор
//     //return `<div>${this.props.text}</div>`;
//     return `
//     <form method=GET action='/authorization' class='authorization-form' onSubmit=${
//       this.submit
//     }>
//         <div class="authorization-form__inner">
//           ${this.renderInput('Логин', 'login')}
//           ${this.renderInput('Пароль', 'password', 'password')}
//         </div>
//         <div class="authorization-form__inner">
//           <input type='submit' value='Авторизироваться' class='button' />
//           </div>
//           </form>
//       `;
//   }
// }

// // function render(query, block) {
// //   const root = document.querySelector(query);
// //   root.appendChild(block.getContent());
// //   return root;
// // }

// // const link = new Link({
// //   path: '/',
// //   mode: 'primary',
// //   label: 'Click me'
// // });

// // // app — это class дива в корне DOM
// // render(".app", link);

// // // Через секунду контент изменится сам, достаточно обновить пропсы
// // setTimeout(() => {
// //   link.setProps({
// //     text: 'Click me, please',
// //   });
// // }, 1000);
