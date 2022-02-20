import {render} from '../utils';

export class Route {
  //TODO все приватные поля должны быть реально приватными
  //TODO что-то тут с типами
  private _pathname: string;
  private _blockClass: any;
  private _block: any;
  private _props: any;

  constructor(pathname: string, view: any, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(); //это созаст экземпляр класса и вызовет его компайл по шаблону
      render(this._props.rootQuery, this._block);
      return;
    }

    this._block.show(); // не факт что заработает и вроде по заданию надо всегда заново создавать вьюху
  }
}

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}
