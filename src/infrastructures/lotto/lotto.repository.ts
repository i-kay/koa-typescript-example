import { LottoRepository as ILottoRepository } from '../../domains/lotto/lotto.repository.interface';
import { Lotto } from '../../domains/lotto/lotto.model';
import { LottoNumber } from '../../domains/lotto/lottoNumber.model';
import { Connection } from 'mysql2/promise';
import { LottoId } from '../../domains/lotto/lotto.types';

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
                createdAt: lotto.createdAt,
                deletedAt: lotto.deletedAt,
            });
        });

        return lottoModels;
    }

    async save(lottos: Lotto[]): Promise<LottoId[]> {
        const values = lottos.map(lotto => {
            return [
                lotto.purchaseId,
                lotto.gameId,
                lotto.userId,
                lotto.order,
                lotto.winningAmount,
                lotto.lottoNumbers[0].number,
                lotto.lottoNumbers[1].number,
                lotto.lottoNumbers[2].number,
                lotto.lottoNumbers[3].number,
                lotto.lottoNumbers[4].number,
                lotto.lottoNumbers[5].number,
                lotto.lottoNumbers[0].state,
                lotto.lottoNumbers[1].state,
                lotto.lottoNumbers[2].state,
                lotto.lottoNumbers[3].state,
                lotto.lottoNumbers[4].state,
                lotto.lottoNumbers[5].state,
                lotto.createdAt,
            ];
        });

        const [results, _] = await this.dbConn.query(
            'INSERT INTO \
            `Lotto` ( \
                `purchaseId`, `gameId`, `userId`, `order`, \
                `winningAmount`, `number1`, `number2`, `number3`, \
                `number4`, `number5`, `number6`, `stateOfNumber1`, \
                `stateOfNumber2`, `stateOfNumber3`, `stateOfNumber4`, \
                `stateOfNumber5`, `stateOfNumber6`, `createdAt` \
            ) VALUES ?',
            [values],
        );

        const idList: number[] = [];

        const { affectedRows, insertId } = results;

        for (let i = 0; i < affectedRows; i += 1) {
            idList.push(insertId + i);
        }

        return idList;
    }
}
