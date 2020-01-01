import { Connection } from 'mysql2/promise';

import { GameStatisticsRepository as IGameStatisticsRepository } from '../../domains/game/game-statistics.repository.interface';

export class GameStatisticsRepository implements IGameStatisticsRepository {
    constructor(private dbConn: Connection) {}

    async getSumOfNumbers(): Promise<number> {
        const [rows, _] = await this.dbConn.query(
            'SELECT \
                ( AVG(`number1`) + AVG(`number2`) + AVG(`number3`) + \
                  AVG(`number4`) + AVG(`number5`) + AVG(`number6`) \
                ) AS sumOfNumbers \
            FROM Game',
        );
        const { sumOfNumbers } = rows[0];
        return sumOfNumbers;
    }
}
