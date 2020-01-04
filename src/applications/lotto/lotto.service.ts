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

interface GetLottosByUserId {
    userId: UserId;
    purchasedLottos: PurchasedLottos;
}

export class LottoService {
    // TODO: purchaseId 단위로 pagination 처리해야 함
    async getLottosByUserId(userId: UserId): Promise<GetLottosByUserId> {
        const dbConn = await getConn();
        const lottos = await new LottoRepository(dbConn).findByUserId(userId);
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

    async createLotto(userId: UserId, gameId: GameId, numbers: number[]) {
        const dbConn = await getConn();
        const user: User = await new UserRepository(dbConn).findById(userId);
        dbConn.end();
        if (!user) {
            // 에러 메시지 정의 해야함
            // 등록된 User가 아니면 예외처리
            throw notFound();
        }
        // const lottoId = this.lottoRepository.nextLottoId();
        const lottoNumbers: LottoNumber[] = numbers.map(number => {
            return new LottoNumber({ number });
        });
    }
}
