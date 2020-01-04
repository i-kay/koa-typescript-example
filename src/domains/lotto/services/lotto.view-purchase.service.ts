import { internal } from '@hapi/boom';

import { Lotto } from '../lotto.model';
import { LottoId, StateOfNumber, PurchaseId } from '../lotto.types';
import { GameId } from '../../game/game.types';
import { Datetime } from '../../common-types/datetime.type';
import { LottoNumber } from '../lottoNumber.model';

type Lottos = Array<{
    id: LottoId;
    rank: number;
    winningAmout: number;
    lottoNumbers: Array<{
        number: number;
        state: StateOfNumber;
    }>;
}>;

export type PurchasedLottos = Array<{
    purchaseId: PurchaseId;
    gameId: GameId;
    purchasedAt: Datetime;
    lottos: Lottos;
}>;

export class LottoViewPurchaseService {
    processPurchasedLottoList(lottos: Lotto[]): PurchasedLottos {
        const purchasedLottos: PurchasedLottos = [];

        lottos.forEach(lotto => {
            const idx = this.findIndex(
                purchasedLottos,
                'purchaseId',
                lotto.purchaseId,
            );
            // purchaseId가 존재하지 않으면 새로 만들고
            if (idx === -1) {
                const lottos: Lottos = [];
                lottos[lotto.order - 1] = {
                    id: lotto.id,
                    rank: this.calculateRank(lotto.lottoNumbers),
                    winningAmout: lotto.winningAmount,
                    lottoNumbers: lotto.lottoNumbers,
                };
                purchasedLottos.push({
                    purchaseId: lotto.purchaseId,
                    gameId: lotto.gameId,
                    purchasedAt: lotto.purchasedAt,
                    lottos,
                });
            } else {
                // purchaseId가 존재하면 lottos 데이터만 넣는다.
                purchasedLottos[idx].lottos[lotto.order - 1] = {
                    id: lotto.id,
                    rank: this.calculateRank(lotto.lottoNumbers),
                    winningAmout: lotto.winningAmount,
                    lottoNumbers: lotto.lottoNumbers,
                };
            }
        });
        return purchasedLottos;
    }

    private findIndex<T>(list: Array<T>, key: string, value: any): number {
        for (var i = 0; i < list.length; i++) {
            if (list[i][key] === value) {
                return i;
            }
        }
        return -1;
    }

    private calculateRank(lottoNumbers: LottoNumber[]): number {
        let win = 0;
        let bonus = 0;
        let not = 0;
        let before = 0;
        lottoNumbers.forEach(lottoNumber => {
            if (lottoNumber.state === 'WIN') {
                win += 1;
            } else if (lottoNumber.state === 'BONUS') {
                bonus += 1;
            } else if (lottoNumber.state === 'NOT') {
                not += 1;
            } else if (lottoNumber.state === 'BEFORE') {
                before += 1;
            } else {
                // TODO: 에러 메시지 정의해야 함
                throw internal();
            }
        });
        if (before === 0) {
            if (win + bonus + not !== 6) {
                // TODO: 에러 메시지 정의해야 함
                throw internal();
            }
        } else {
            if (before !== 6) {
                // TODO: 에러 메시지 정의해야 함
                throw internal();
            }
        }

        if (bonus > 1) {
            // TODO: 에러 메시지 정의해야 함
            throw internal();
        }

        if (win === 6) {
            return 1;
        }
        if (win === 5) {
            if (bonus === 1) {
                return 2;
            }
            return 3;
        }
        if (win === 4) {
            return 4;
        }
        if (win === 3) {
            return 3;
        }
        return 0;
    }
}
