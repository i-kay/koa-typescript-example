import { conflict, notFound } from '@hapi/boom';

import { MemoryGameRepository } from '../../infrastructures/game/memory.game.repository';
import { Game } from '../../domains/game/game.model';
import { GameRepository } from '../../domains/game/game.repository.interface';
import { GameId } from '../../domains/game/game.types';

export class GameService {
    gameRepository: GameRepository = new MemoryGameRepository();

    getGameByGameId(gameId: GameId): Game {
        const game: Game = this.gameRepository.findOneByGameId(gameId);
        if (!game) {
            // 에러 메시지 추가해야 함
            throw notFound();
        }
        return game;
    }

    /**
     *
     * 로또 게임 한 개를 생성한다.
     *
     * @param gameId 로또 회차
     */
    createGame(gameId: GameId): void {
        const game = new Game({ gameId });
        this.checkSavingGamePossible(game);
        this.gameRepository.saveOne(game);
    }

    /**
     *
     * 로또 번호를 뽑는다.
     *
     * @param gameId 로또 회차
     * @param numbers 로또 6자리 번호
     * @param bonus 로또 보너스 번호
     */
    pullGame(gameId: GameId, numbers: number[], bonus: number): void {
        const game: Game = this.gameRepository.findOneByGameId(gameId);
        game.pull(numbers, bonus);
        this.gameRepository.saveOne(game);
    }

    private checkSavingGamePossible(game): void {
        if (this.gameRepository.findOneByGameId(game.getGameId())) {
            // 에러 메시지 정의해야 함
            throw conflict();
        }
    }
}
