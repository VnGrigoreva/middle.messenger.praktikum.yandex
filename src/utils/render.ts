import {Block} from '../components';

export default function (query: string, block: Block) {
  const root = document.querySelector(query);
  root?.appendChild(block.getContent());
  return root;
}