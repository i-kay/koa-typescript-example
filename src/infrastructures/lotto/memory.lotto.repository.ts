import { LottoRepository } from '../../domains/lotto/lotto.repository.interface';
import { Lotto } from '../../domains/lotto/lotto.model';
import {
    WinningType,
    LottoNumber,
} from '../../domains/lotto/lottoNumber.model';
import { UserId } from '../../domains/user/user.types';
import { GameState } from '../../domains/game/game.types';
import { LottoId } from '../../domains/lotto/lotto.types';

import * as lottoInMemory from '../../../data/lottos.json';

const lottosData = [...lottoInMemory];
let lottoId = lottosData[lottosData.length - 1].lottoId;

export class MemoryLottoRepository implements LottoRepository {
    findAllByUserId(userId: UserId): Lotto[] {
        const filteredLottos = lottosData.filter(
            lotto => lotto.userId === userId,
        );
        const lottos: Lotto[] = [];
        for (const lotto of filteredLottos) {
            const lottoNumbers = lotto.lottoNumbers.map(l => {
                return new LottoNumber({
                    number: l.number,
                    winningType: l.winningType as WinningType,
                });
            });
            lottos.push(
                new Lotto({
                    lottoNumbers,
                    lottoId: lotto.lottoId,
                    userId: lotto.userId,
                    gameId: lotto.gameId,
                    purchaseDate: lotto.purchaseDate,
                    gameState: lotto.gameState as GameState,
                    rank: lotto.rank,
                }),
            );
        }
        return lottos;
    }

    save(lottos: Lotto[]): void {
        for (const lotto of lottos) {
            const row = lottosData.find(l => l.lottoId === lotto.getLottoId());
            const lottoNumbers = lotto.getLottoNumbers();
            if (row) {
                // update

                row.gameState = lotto.getGameState();
                row.lottoNumbers = lottoNumbers.map(l => {
                    return {
                        number: l.getNumber(),
                        winningType: l.getWinningType(),
                    };
                });
                row.rank = lotto.getRank();
            } else {
                // insert

                const newLotto = {
                    lottoId: lotto.getLottoId(),
                    userId: lotto.getUserId(),
                    gameId: lotto.getGameId(),
                    lottoNumbers: lottoNumbers.map(l => {
                        return {
                            number: l.getNumber(),
                            winningType: l.getWinningType(),
                        };
                    }),
                    gameState: lotto.getGameState(),
                    purchaseDate: lotto.getPurchaseDate(),
                };
                lottosData.push(newLotto);
            }
        }
    }

    nextLottoId(): LottoId {
        return ++lottoId;
    }
}
