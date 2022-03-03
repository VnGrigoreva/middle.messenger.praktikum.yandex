import {expect} from 'chai';
import {Router} from '../router';
import {describe, it} from 'mocha';
import {JSDOM} from 'jsdom';
import 'mocha';

class FakeBlock {
  getContent() {
    const div = document.createElement('div');
    div.id = 'test';
    return div;
  }
}

describe('Router', () => {
  beforeEach(() => {
    const dom = new JSDOM('<div class="app"></div>', {
      url: 'http://localhost:3000',
    });
    global.document = dom.window.document;
    (global as any).window = dom.window;
  });
  it('use', () => {
    const router = new Router('.app');
    const res = router.use('/', FakeBlock as any);
    expect(res).to.eq(router);
  });
  it('should be singleton', () => {
    const router = new Router('.app');

    expect(new Router('.app')).to.eq(router);
  });
  it('go', () => {
    const router = new Router('.app');
    router.use('/fakePage', FakeBlock as any);
    router.go('/fakePage');

    expect(document.getElementById('test')).not.to.be.null;
    expect(window.location.pathname).to.eq('/');
  });
});
