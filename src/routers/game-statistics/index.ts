import * as router from 'koa-joi-router';

import getSumofNumbers from './get.sum-of-numbers';
import getEvenNumbers from './get.average-of-even-numbers';
import getFrequencyOfNumbers from './get.frequency-of-numbers';

const game = router();

game.prefix('/game-statistics');

game.route([getSumofNumbers, getEvenNumbers, getFrequencyOfNumbers]);

export default game;
