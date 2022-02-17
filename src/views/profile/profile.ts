import {Profile} from '../../pages';
import {render} from '../../utils';

const profile = new Profile({isView: false});
render('.app', profile);
