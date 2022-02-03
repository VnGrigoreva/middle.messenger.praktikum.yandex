import { ErrorPage } from '../../components';
import { render } from '../../utils';

const error400 = new ErrorPage({ code: '404', message: 'Не туда попали' });
render('.app', error400);
