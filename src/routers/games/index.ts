import * as router from 'koa-joi-router';

import get from './get';
import post from './post';
import put from './pull.put';

const game = router();

game.prefix('/games');

game.route([get, post, put]);

export default game;
