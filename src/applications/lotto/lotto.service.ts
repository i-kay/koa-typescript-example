import { notFound } from '@hapi/boom';

import { Datetime } from '../../domains/common-types/datetime.type';

import { Lotto } from '../../domains/lotto/lotto.model';
import { User } from '../../domains/user/user.model';
import { LottoNumber } from '../../domains/lotto/lottoNumber.model';
import { UserId } from '../../domains/user/user.types';
import { GameId } from '../../domains/game/game.types';
import { LottoRepository } from '../../infrastructures/lotto/lotto.repository';
import { UserRepository } from '../../infrastructures/user/user.repository';
import { getConn } from '../../libs/mysql-client';
import {
    PurchasedLottos,
    LottoViewPurchaseService,
} from '../../domains/lotto/services/lotto.view-purchase.service';
import { PurchaseId } from '../../domains/lotto/lotto.types';

interface GetLottosByUserId {
    userId: UserId;
    purchasedLottos: PurchasedLottos;
}

export class LottoService {
    // TODO: purchaseId 단위로 pagination 처리해야 함
    async getLottosByUserId(userId: UserId): Promise<GetLottosByUserId> {
        const dbConn = await getConn();
        const lottos = await new LottoRepository(dbConn).findByUserId(userId);
        dbConn.end();
        if (lottos.length === 0) {
            throw notFound();
        }

        const purchasedLottos = new LottoViewPurchaseService().processPurchasedLottoList(
            lottos,
        );

        return {
            userId,
            purchasedLottos,
        };
    }

    async createLotto(
        purchaseId: PurchaseId,
        userId: UserId,
        gameId: GameId,
        lottoNumbersList: number[][],
    ) {
        const dbConn = await getConn();
        const user: User = await new UserRepository(dbConn).findById(userId);

        if (!user) {
            dbConn.end();
            // TODO: 에러 메시지 정의 해야함
            // 등록된 User가 아니면 예외처리
            throw notFound();
        }

        let lottos: Lotto[] = [];

        lottoNumbersList.forEach((lottoNumbers, idx) => {
            const lotto: Lotto = new Lotto({
                purchaseId,
                gameId,
                userId,
                order: idx + 1,
                lottoNumbers: [
                    new LottoNumber({ number: lottoNumbers[0] }),
                    new LottoNumber({ number: lottoNumbers[1] }),
                    new LottoNumber({ number: lottoNumbers[2] }),
                    new LottoNumber({ number: lottoNumbers[3] }),
                    new LottoNumber({ number: lottoNumbers[4] }),
                    new LottoNumber({ number: lottoNumbers[5] }),
                ],
            });
            lottos.push(lotto);
        });

        // 생성된 lotto의 id
        const lottoIdList = await new LottoRepository(dbConn).save(lottos);

        dbConn.end();
    }
}
