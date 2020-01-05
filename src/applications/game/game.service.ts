import { notFound } from '@hapi/boom';

import { GameRepository } from '../../infrastructures/game/game.repository';
import { Game } from '../../domains/game/game.model';
import { GameId } from '../../domains/game/game.types';
import { getConn } from '../../libs/mysql-client';
import { now } from '../../libs/datetime-handler';
import { GameCreationService } from '../../domains/game/services/game.creation.service';
import { GameDrawService } from '../../domains/game/services/game.draw.service';

export class GameService {
    async getGameByGameId(gameId: GameId[]): Promise<Game[]> {
        const dbConn = await getConn();
        const games: Game[] = await new GameRepository(dbConn).findById(gameId);
        dbConn.end();
        if (!games) {
            // 에러 메시지 추가해야 함
            throw notFound();
        }
        return games;
    }

    /**
     *
     * 로또 게임 한 개를 생성한다.
     *
     * @param gameId 로또 회차
     */
    async createGame(gameId: GameId): Promise<void> {
        const dbConn = await getConn();
        const game = new Game({ id: gameId, createdAt: now() });
        await new GameCreationService().checkSavingGamePossible(dbConn, gameId);
        await new GameRepository(dbConn).saveOne(game);
        dbConn.end();
    }

    /**
     *
     * 로또 번호를 뽑는다.
     *
     * @param gameId 로또 회차
     * @param numbers 로또 번호. 0~5는 로또, 6번은 보너스 번호
     */
    async drawGame(gameId: GameId, numbers: number[]): Promise<void> {
        const dbConn = await getConn();
        const games = await new GameRepository(dbConn).findById([gameId]);
        await new GameDrawService().checkdrawingGamePossible(games);
        const game = games[0];
        game.draw(numbers);
        await new GameRepository(dbConn).saveOne(game);
        dbConn.end();
    }
}
