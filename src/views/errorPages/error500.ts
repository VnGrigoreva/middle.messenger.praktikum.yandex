import {ErrorPage} from '../../components';
import {render} from '../../utils';

const error500 = new ErrorPage({code: '500', message: 'Мы уже фиксим'});
render(".app", error500);
