import pug from 'pug';
import {Block} from '../components';

export const compile = (tmpl: string, props: any = {}): DocumentFragment => {
  const fragment = document.createElement('template');
  const components: Record<string, Block> = {};

  Object.entries(props).forEach(([name, value]) => {
    if (value instanceof Block) {
      components[value.id] = value;
      props[name] = `div id="id-${value.id}"`;
    } else if (
      Array.isArray(value) &&
      value.every((block) => block instanceof Block)
    ) {
      props[name] = value.map((x) => {
        components[x.id] = x;
        return `div id="id-${x.id}"`;
      });
    }
  });

  fragment.innerHTML = pug.render(tmpl, {doctype: 'html', ...props});

  Object.entries(components).forEach(([id, component]) => {
    const stub = fragment.content.querySelector(`#id-${id}`);

    if (!stub) {
      return;
    }
    stub.replaceWith(component.getContent());
  });

  return fragment.content;
};
