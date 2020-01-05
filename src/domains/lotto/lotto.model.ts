import { LottoNumber } from './lottoNumber.model';
import { UserId } from '../user/user.types';
import { Datetime } from '../common-types/datetime.type';
import { LottoId, PurchaseId } from './lotto.types';
import { GameId } from '../game/game.types';
import { now } from '../../libs/datetime-handler';

interface Cntr {
    id?: LottoId;
    purchaseId: PurchaseId; // 구매단위를 구분하는 id
    gameId: GameId;
    userId: UserId;
    order: number; // 용지 내 순서. 1~5
    winningAmount?: number;
    lottoNumbers: LottoNumber[];
    createdAt?: Datetime;
    deletedAt?: Datetime;
}

export class Lotto {
    id: LottoId;
    purchaseId: PurchaseId; // 구매단위를 구분하는 id
    gameId: GameId;
    userId: UserId;
    order: number; // 용지 내 순서. 1~5
    winningAmount: number;
    lottoNumbers: LottoNumber[];
    createdAt: Datetime;
    deletedAt: Datetime;

    constructor(lotto: Cntr) {
        this.id = lotto.id;
        this.purchaseId = lotto.purchaseId;
        this.gameId = lotto.gameId;
        this.userId = lotto.userId;
        this.order = lotto.order;
        this.winningAmount = lotto.winningAmount || 0;
        this.lottoNumbers = lotto.lottoNumbers;
        this.createdAt = lotto.createdAt || now();
        this.deletedAt = lotto.deletedAt;
    }
}
