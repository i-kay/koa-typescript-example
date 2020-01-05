import { notFound } from '@hapi/boom';
import { Connection } from 'mysql2/promise';

import { UserRepository } from '../../../infrastructures/user/user.repository';
import { User } from '../../user/user.model';
import { LottoNumber } from '../lottoNumber.model';
import { Lotto } from '../lotto.model';
import { UserId } from '../../user/user.types';
import { PurchaseId } from '../lotto.types';
import { GameId } from '../../game/game.types';

export class LottoCreationService {
    async checkValidationBeforeCreated(
        dbConn: Connection,
        userId: UserId,
    ): Promise<void> {
        const user: User = await new UserRepository(dbConn).findById(userId);

        if (!user) {
            dbConn.end();
            // TODO: 에러 메시지 정의 해야함
            // 등록된 User가 아니면 예외처리
            throw notFound();
        }
    }

    processLottoNumbersList(
        purchaseId: PurchaseId,
        userId: UserId,
        gameId: GameId,
        lottoNumbersList: number[][],
    ): Lotto[] {
        const lottos: Lotto[] = [];

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
        return lottos;
    }
}
