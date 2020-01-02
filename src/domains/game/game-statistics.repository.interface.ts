export interface GameStatisticsRepository {
    calculateSumOfNumbers(): Promise<number>;
    calculateAverageOfEvenNumbers(): Promise<number>;
    calculateFrequencyOfNumbers(): Promise<number[]>;
}
