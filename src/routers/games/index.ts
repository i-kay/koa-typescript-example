import * as router from 'koa-joi-router';

import get from './get';
import post from './post';
import put from './draw.put';

const game = router();

game.prefix('/games');

game.route([get, post, put]);

export default game;
