import { notFound, notAcceptable } from '@hapi/boom';

import { GameState } from '../game.types';
import { Game } from '../game.model';

export class GameDrawService {
    async checkdrawingGamePossible(games: Game[]): Promise<void> {
        if (!games) {
            throw notFound();
        }

        if (games[0].state !== GameState.BEFORE) {
            throw notAcceptable();
        }
    }
}
