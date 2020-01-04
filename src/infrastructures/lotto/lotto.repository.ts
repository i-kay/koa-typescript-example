import { LottoRepository as ILottoRepository } from '../../domains/lotto/lotto.repository.interface';
import { Lotto } from '../../domains/lotto/lotto.model';
import { LottoNumber } from '../../domains/lotto/lottoNumber.model';
import { Connection } from 'mysql2/promise';

export class LottoRepository implements ILottoRepository {
    constructor(private dbConn: Connection) {}

    // TODO: purchasId 단위로 pagination 구현 필요
    async findByUserId(userId: number): Promise<Lotto[]> {
        const [lottos, _] = await this.dbConn.query(
            'SELECT * FROM Lotto WHERE `userId` = ?',
            [userId],
        );
        if (lottos.length === 0) {
            return [];
        }

        const lottoModels = lottos.map(lotto => {
            return new Lotto({
                id: lotto.id,
                purchaseId: lotto.purchaseId,
                gameId: lotto.gameId,
                userId: lotto.userId,
                order: lotto.order,
                winningAmount: lotto.winningAmount,
                lottoNumbers: [
                    new LottoNumber({
                        number: lotto.number1,
                        state: lotto.stateOfNumber1,
                    }),
                    new LottoNumber({
                        number: lotto.number2,
                        state: lotto.stateOfNumber2,
                    }),
                    new LottoNumber({
                        number: lotto.number3,
                        state: lotto.stateOfNumber3,
                    }),
                    new LottoNumber({
                        number: lotto.number4,
                        state: lotto.stateOfNumber4,
                    }),
                    new LottoNumber({
                        number: lotto.number5,
                        state: lotto.stateOfNumber5,
                    }),
                    new LottoNumber({
                        number: lotto.number6,
                        state: lotto.stateOfNumber6,
                    }),
                ],
                purchasedAt: lotto.purchasedAt,
                deletedAt: lotto.deletedAt,
            });
        });

        return lottoModels;
    }
}
