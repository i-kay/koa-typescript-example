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
        ).calculateSumOfNumbers();
        dbConn.end();
        return sum;
    }

    async getAverageOfEvenNumbers(): Promise<number> {
        const dbConn = await getConn();
        const AverageOfevenNumbers = await new GameStatisticsRepository(
            dbConn,
        ).calculateAverageOfEvenNumbers();
        dbConn.end();
        return AverageOfevenNumbers;
    }

    async getFrequencyOfNumbers(): Promise<number[]> {
        const dbConn = await getConn();
        const frequencyOfNumbers = await new GameStatisticsRepository(
            dbConn,
        ).calculateFrequencyOfNumbers();
        dbConn.end();
        return frequencyOfNumbers;
    }
}
