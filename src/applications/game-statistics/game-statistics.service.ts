import { getConn } from '../../libs/mysql-client';
import { GameStatisticsRepository } from '../../infrastructures/game/game-statistics.repository';

export class GameStatisticsService {
    /**
     * 번호들의 합.
     */
    async getSumOfNumbers(): Promise<number> {
        const dbConn = await getConn();
        const sum = await new GameStatisticsRepository(
            dbConn,
        ).getSumOfNumbers();
        dbConn.end();
        return sum;
    }
}
