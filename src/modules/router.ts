// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {Route} from './route';

export type HistoryEvent = {
  currentTarget: Window;
};
export class Router {
  //TODO
  private static _instance: Router;
  routes?: Route[];
  errorBlock: any;
  history?: History;
  private _currentRoute: any;
  private _rootQuery: any;

  constructor(rootQuery: any) {
    if (Router._instance) {
      return Router._instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router._instance = this;
  }

  use(pathname: string, block: any) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});
    this.routes?.push(route);

    return this;
  }

  useError(block: any) {
    this.errorBlock = block;

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      //TODO
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this._onRoute(event?.currentTarget?.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (!route && this.errorBlock) {
      route = new Route(pathname, this.errorBlock, {
        rootQuery: this._rootQuery,
      });
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    // route.render(route, pathname);
    route?.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history?.back();
  }

  forward() {
    this.history?.forward();
  }

  getRoute(pathname: string) {
    return this.routes?.find((route) => route.match(pathname));
  }
}
