import { conflict } from '@hapi/boom';
import { Connection } from 'mysql2/promise';

import { GameRepository } from '../../../infrastructures/game/game.repository';
import { GameId } from '../game.types';

export class GameCreationService {
    async checkSavingGamePossible(
        dbConn: Connection,
        gameId: GameId,
    ): Promise<void> {
        const games = await new GameRepository(dbConn).findById([gameId]);
        if (games) {
            // 에러 메시지 정의해야 함
            // 로또 번호를 입력했을 때 id가 중복되는 경우
            throw conflict();
        }
    }
}
