import { notAcceptable } from '@hapi/boom';

import { GameId, GameState } from './game.types';
import { Datetime } from '../common-types/datetime.type';
import { now } from '../../libs/datetime-handler';

interface Cntr {
    id: GameId;
    state?: GameState;
    numbers?: number[];
    createdAt?: Datetime;
    drawnAt?: Datetime;
}

export class Game {
    id: GameId;
    state: GameState;
    numbers?: number[];
    createdAt?: Datetime;
    drawnAt?: Datetime;

    constructor(game: Cntr) {
        this.id = game.id;
        this.state = game.state || GameState.BEFORE;
        this.numbers = this.setNumbers(game.numbers);
        this.createdAt = game.createdAt;
        this.drawnAt = game.drawnAt;
    }

    draw(numbers: number[]) {
        this.state = GameState.AFTER;
        this.numbers = [...numbers];
        this.drawnAt = now();
    }

    private setNumbers(numbers: number[]): number[] | null {
        if (this.state === GameState.BEFORE) {
            return [];
        }
        return numbers;
    }
}
