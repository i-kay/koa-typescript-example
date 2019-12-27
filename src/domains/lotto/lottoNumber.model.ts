export type WinningType = 'BONUS' | 'WIN' | 'NOT_WIN';

export class LottoNumber {
    private number: number;
    private winningType: WinningType;

    constructor({
        number,
        winningType,
    }: {
        number: number;
        winningType?: WinningType;
    }) {
        this.number = number;
        this.winningType = winningType || 'NOT_WIN';
    }

    calculateWinningType(gameNumbers: number[], bonus: number): void {
        if (gameNumbers.includes(this.number)) {
            this.winningType = 'WIN';
        } else if (bonus === this.number) {
            this.winningType = 'BONUS';
        }
    }

    getNumber(): number {
        return this.number;
    }

    getWinningType(): WinningType {
        return this.winningType;
    }
}
