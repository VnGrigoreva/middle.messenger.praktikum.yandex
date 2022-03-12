import {Block} from "../components";
import {Route} from "./route";

export type HistoryEvent = {
  currentTarget: Window;
};
export class Router {
  private static _instance: Router;
  routes?: Route[];
  errorBlock: Block | null = null;
  history?: History;
  private _currentRoute: Route | undefined = undefined;
  private _rootQuery: string | null = null;

  constructor(rootQuery: string) {
    if (Router._instance) {
      return Router._instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = undefined;
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
      this._onRoute((event?.currentTarget as Window)?.location?.pathname);
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
    route?.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, "", pathname);
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
