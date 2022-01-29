import {Form, Block} from './components';

function render(query: string, block: Block) {
    const root = document.querySelector(query);
    root?.appendChild(block.getContent());
    return root;
  }
  
  const form = new Form();

  render(".app", form);


