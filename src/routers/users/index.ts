import * as router from 'koa-joi-router';

import get from './get';
import post from './post';

const user = router();

user.prefix('/users');

user.route([get, post]);

export default user;
