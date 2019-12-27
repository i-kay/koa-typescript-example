import { GameRepository } from '../../domains/game/game.repository.interface';
import { MemoryGameRepository } from '../../infrastructures/game/memory.game.repository';
import { Game } from '../../domains/game/game.model';
import { GameState } from '../../domains/game/game.types';

interface Frequency {
    number: number;
    count: number;
}

export class GameStatisticsService {
    gameRepository: GameRepository = new MemoryGameRepository();

    async getGameStatistics(): Promise<{
        sum: number;
        theNumberOfEven: number;
        frequencies: Frequency[];
    }> {
        const games = this.gameRepository
            .findAll()
            .filter(game => game.getGameState() === GameState.AFTER_PULL);

        const [sum, theNumberOfEven, frequencies] = await Promise.all([
            this.calculateAverageOfSumOfWinningNumbers(games),
            this.calculateAverageOfTheNumberOfEven(games),
            this.calculateFrequencyofNumeralsAppearing(games),
        ]);

        return {
            sum,
            theNumberOfEven,
            frequencies,
        };
    }

    /**
     * 로뽀 번호 출현 횟수를 계산한다.
     */
    private async calculateFrequencyofNumeralsAppearing(
        games: Game[],
    ): Promise<Frequency[]> {
        const frequencies = [];
        this.initialize(frequencies);

        games.forEach(game => {
            const numbers = game.getnumbers();
            numbers.forEach(number => {
                frequencies[number - 1] += 1;
            });
        });
        return frequencies;
    }

    /**
     * 로또 번호 출현횟수를 count할 배열을 초기화
     */
    private initialize(numbers: number[]): void {
        const len = 45;
        for (let i = 0; i < len; i += 1) {
            numbers[i] = 0;
        }
    }

    /**
     * 짝수가 나타난 빈도의 평균
     */
    private async calculateAverageOfTheNumberOfEven(
        games: Game[],
    ): Promise<number> {
        const sumOfAverage = games
            .map(game => {
                const numbers = game.getnumbers();
                let theNumberOfEven = 0;
                numbers.forEach(number => {
                    if (number % 2 === 0) {
                        theNumberOfEven += 1;
                    }
                });
                return theNumberOfEven;
            })
            .reduce((average, number) => {
                return average + number;
            }, 0);

        return sumOfAverage / games.length;
    }

    /**
     * 당첨된 번호의 합의 평균
     */
    private async calculateAverageOfSumOfWinningNumbers(
        games: Game[],
    ): Promise<number> {
        const sum = games
            .map(game => {
                const sum = game.getnumbers().reduce((total, number) => {
                    return total + number;
                }, 0);
                return sum;
            })
            .reduce((total, average) => {
                return total + average;
            }, 0);
        return sum / games.length;
    }
}
