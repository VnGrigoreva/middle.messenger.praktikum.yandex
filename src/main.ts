import {Input, Block} from './components';

function render(query: string, block: Block<any>) {
    const root = document.querySelector(query);
    root?.appendChild(block.getContent());
    return root;
  }
  
  const input = new Input({label: 'Hello mazafacker'});
  
  // app — это class дива в корне DOM
  render(".app", input);

  setTimeout(() => {
    input.setProps({
      label: 'Hello mazafacker, please',
    });
  }, 1000);


