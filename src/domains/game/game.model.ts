import { notAcceptable } from '@hapi/boom';

import { GameId, GameState } from './game.types';

interface Cntr {
    gameId: GameId;
    gameState?: GameState;
    numbers?: number[];
    bonus?: number;
}

export class Game {
    private gameId: GameId;
    private gameState: GameState;
    private numbers?: number[];
    private bonus?: number;

    constructor(game: Cntr) {
        this.gameId = game.gameId;
        this.gameState = game.gameState || GameState.BEFORE_PULL;
        this.numbers = this.setNumbers(game.numbers);
        this.bonus = game.bonus || null;
    }

    /**
     * `gameState`가 `'AFTER_PULL'` 이면 `true`를 반환
     */
    didPull() {
        return this.gameState === GameState.AFTER_PULL;
    }

    /**
     * 로또 번호를 뽑은 것을 model에 반영한다.
     *
     * @param numbers 로또 6자리 번호
     * @param bonus 로또 보너스 번호
     */
    pull(numbers: number[], bonus: number): void {
        if (this.gameState === GameState.AFTER_PULL) {
            // 에러 메시지 추가해야 함
            throw notAcceptable();
        }

        if (numbers.length !== 6) {
            // 에러 메시지 추가애햐 함
            throw notAcceptable();
        }
        this.gameState = GameState.AFTER_PULL;
        this.numbers = [...numbers];
        this.bonus = bonus;
    }

    getGameId(): GameId {
        return this.gameId;
    }
    getGameState(): GameState {
        return this.gameState;
    }
    getnumbers(): number[] {
        return this.numbers;
    }
    getbonus(): number {
        return this.bonus;
    }

    private setNumbers(numbers: number[]): number[] {
        if (!numbers) {
            return null;
        }
        if (numbers.length !== 6) {
            // error message 추가 해야 함
            throw notAcceptable();
        }
        return [...numbers];
    }
}
