import { LottoNumber } from './lottoNumber.model';
import { UserId } from '../user/user.types';
import { Datetime } from '../common-types/datetime.type';
import { LottoId } from './lotto.types';
import { GameState, GameId } from '../game/game.types';

interface Cntr {
    lottoId: LottoId;
    userId: UserId;
    gameId: GameId;
    lottoNumbers: LottoNumber[];
    purchaseDate: Datetime;
    gameState?: GameState;
    rank?: number; // 1: 1등, 2: 2등, ... 5: 5둥
}

export class Lotto {
    private lottoId: LottoId;
    private userId: UserId;
    private gameId: GameId;
    private lottoNumbers: LottoNumber[];
    private purchaseDate: Datetime;
    private gameState: GameState;
    private rank: number;

    constructor(lotto: Cntr) {
        this.lottoId = lotto.lottoId;
        this.userId = lotto.userId;
        this.gameId = lotto.gameId;
        this.lottoNumbers = [...lotto.lottoNumbers];
        this.purchaseDate = lotto.purchaseDate;
        this.gameState = lotto.gameState || GameState.BEFORE_PULL;
        this.rank = lotto.rank;
    }

    /**
     * `gameState`가 `'AFTER_PULL'` 이면 `true`를 반환
     */
    didPull(): boolean {
        return this.gameState === GameState.AFTER_PULL;
    }

    calculateWinningNumbers(gameNumbers: number[], bonus: number) {
        this.markLottoNumberskWinningType(gameNumbers, bonus);
        this.calculateRank();
        this.gameState = GameState.AFTER_PULL;
    }

    private markLottoNumberskWinningType(
        gameNumbers: number[],
        bonus: number,
    ): void {
        this.lottoNumbers.forEach(lottoNumber => {
            lottoNumber.calculateWinningType(gameNumbers, bonus);
        });
    }

    private calculateRank() {
        let cntWin = 0;
        let hasBonus = false;
        this.lottoNumbers.forEach(lottoNumber => {
            if (lottoNumber.getWinningType() === 'WIN') {
                cntWin += 1;
            } else if (lottoNumber.getWinningType() === 'BONUS') {
                hasBonus = true;
            }
        });
        if (cntWin === 6) {
            this.rank = 1;
        } else if (cntWin === 5) {
            if (hasBonus) {
                this.rank = 2;
            } else {
                this.rank = 3;
            }
        } else if (cntWin === 4) {
            this.rank = 4;
        } else if (cntWin === 3) {
            this.rank = 5;
        }
    }

    getLottoId(): LottoId {
        return this.lottoId;
    }
    getUserId(): UserId {
        return this.userId;
    }
    getGameId(): GameId {
        return this.gameId;
    }
    getLottoNumbers(): LottoNumber[] {
        return this.lottoNumbers;
    }
    getPurchaseDate(): Datetime {
        return this.purchaseDate;
    }
    getGameState(): GameState {
        return this.gameState;
    }
    getRank(): number {
        return this.rank;
    }
}
