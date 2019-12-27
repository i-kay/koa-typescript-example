import * as router from 'koa-joi-router';

import get from './get';

const game = router();

game.prefix('/game-statistics');

game.route([get]);

export default game;
