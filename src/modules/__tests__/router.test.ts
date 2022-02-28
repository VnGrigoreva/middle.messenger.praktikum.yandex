import {expect} from 'chai';
import {Router} from '../router';
import {describe, it} from 'mocha';
import {JSDOM} from 'jsdom';
import 'mocha';

describe('Router', () => {
  beforeEach(() => {
    const dom = new JSDOM('<div id="app"></div>', {
      url: 'http://localhost:3000',
    });
    global.document = dom.window.document;
    (global as any).window = dom.window;
  });
  it('use', () => {
    const router = new Router('.app');
    const res = router.use('/', class {});
    expect(res).to.eq(router);
  });
  it('should be singleton', () => {
    const router = new Router('.app');

    expect(new Router('.app')).to.eq(router);
  });
  it('go', () => {
    class FakeBlock {
      getContent() {
        const div = document.createElement('div');
        div.id = 'test';
        return div;
      }
    }
    const router = new Router('.app');
    router.use('/', FakeBlock);
    router.go('/');

    expect(document.getElementById('test')).not.to.be.undefined;
    expect(window.location.pathname).to.eq('/');
  });
});
