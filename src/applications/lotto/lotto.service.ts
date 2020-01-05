import { notFound } from '@hapi/boom';

import { UserId } from '../../domains/user/user.types';
import { GameId } from '../../domains/game/game.types';
import { PurchaseId } from '../../domains/lotto/lotto.types';
import { LottoRepository } from '../../infrastructures/lotto/lotto.repository';
import { getConn } from '../../libs/mysql-client';
import {
    PurchasedLottos,
    LottoViewPurchaseService,
} from '../../domains/lotto/services/lotto.view-purchase.service';
import { LottoCreationService } from '../../domains/lotto/services/lotto.creation.service';

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
        const lottoCreationService = new LottoCreationService();
        const dbConn = await getConn();

        await lottoCreationService.checkValidationBeforeCreated(dbConn, userId);

        const lottos = lottoCreationService.processLottoNumbersList(
            purchaseId,
            userId,
            gameId,
            lottoNumbersList,
        );

        // 생성된 lotto의 id
        const lottoIdList = await new LottoRepository(dbConn).save(lottos);

        dbConn.end();
    }
}
