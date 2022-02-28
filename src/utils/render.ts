import {Block} from '../components';

export const render = (query: string, block: Block) => {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
};
