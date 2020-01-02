import { Connection } from 'mysql2/promise';

import { GameStatisticsRepository as IGameStatisticsRepository } from '../../domains/game/game-statistics.repository.interface';

export class GameStatisticsRepository implements IGameStatisticsRepository {
    constructor(private dbConn: Connection) {}

    async calculateSumOfNumbers(): Promise<number> {
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

    async calculateAverageOfEvenNumbers(): Promise<number> {
        const [rows, _] = await this.dbConn.query(
            'SELECT AVG(T.cnt) evenNumbers \
             FROM( \
                SELECT id, \
                ( \
                    case when MOD(`number1`,2)=0 then 1 else 0 end + \
                    case when MOD(`number2`,2)=0 then 1 else 0 end + \
                    case when MOD(`number3`,2)=0 then 1 else 0 end + \
                    case when MOD(`number4`,2)=0 then 1 else 0 end + \
                    case when MOD(`number5`,2)=0 then 1 else 0 end + \
                    case when MOD(`number6`,2)=0 then 1 else 0 end \
                ) as cnt \
                FROM Game \
            ) T ',
        );

        const { evenNumbers } = rows[0];
        return evenNumbers;
    }

    async calculateFrequencyOfNumbers(): Promise<number[]> {
        throw new Error('Method not implemented.');
    }
}
