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
        const [rows, _] = await this.dbConn.query(
            ' \
            SELECT DISTINCT(T.num), SUM(T.cnt) cnt \
            FROM ( \
                SELECT number1 num, COUNT(number1) cnt \
                FROM Game \
                WHERE number1 IS NOT NULL \
                Group By number1 \
                UNION \
                SELECT number2 num, COUNT(number2) cnt \
                FROM Game \
                WHERE number2 IS NOT NULL \
                Group By number2 \
                UNION \
                SELECT number3 num, COUNT(number3) cnt \
                FROM Game \
                WHERE number3 IS NOT NULL \
                Group By number3 \
                UNION \
                SELECT number4 num, COUNT(number4) cnt \
                FROM Game \
                WHERE number4 IS NOT NULL \
                Group By number4 \
                UNION \
                SELECT number5 num, COUNT(number5) cnt \
                FROM Game \
                WHERE number5 IS NOT NULL \
                Group By number5 \
                UNION \
                SELECT number6 num, COUNT(number6) cnt \
                FROM Game \
                WHERE number6 IS NOT NULL \
                Group By number6 \
            ) T \
            GROUP BY T.num',
        );
        const frequencyOfNumbers = rows.map(row => {
            return Number(row.cnt);
        });
        return frequencyOfNumbers;
    }
}
