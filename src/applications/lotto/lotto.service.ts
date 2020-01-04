import { notFound } from '@hapi/boom';

import { Datetime } from '../../domains/common-types/datetime.type';

import { Game } from '../../domains/game/game.model';
import { Lotto } from '../../domains/lotto/lotto.model';
import { User } from '../../domains/user/user.model';
import { LottoNumber } from '../../domains/lotto/lottoNumber.model';
import { UserId } from '../../domains/user/user.types';
import { GameId, GameState } from '../../domains/game/game.types';
import {
    LottoId,
    PurchaseId,
    StateOfNumber,
} from '../../domains/lotto/lotto.types';
import { LottoRepository } from '../../infrastructures/lotto/lotto.repository';
import { UserRepository } from '../../infrastructures/user/user.repository';
import { getConn } from '../../libs/mysql-client';

type Lottos = Array<{
    id: LottoId;
    rank: number;
    winningAmout: number;
    lottoNumbers: Array<{
        number: number;
        state: StateOfNumber;
    }>;
}>;

type PurchasedLottos = Array<{
    purchaseId: PurchaseId;
    gameId: GameId;
    purchasedAt: Datetime;
    lottos: Lottos;
}>;

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

        const purchasedLottos: PurchasedLottos = [];

        lottos.forEach(lotto => {
            const idx = findIndex(
                purchasedLottos,
                'purchaseId',
                lotto.purchaseId,
            );
            // purchaseId가 존재하지 않으면 새로 만들고
            if (idx === -1) {
                const lottos: Lottos = [];
                lottos[lotto.order - 1] = {
                    id: lotto.id,
                    rank: calculateRank(lotto.lottoNumbers),
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
                    rank: calculateRank(lotto.lottoNumbers),
                    winningAmout: lotto.winningAmount,
                    lottoNumbers: lotto.lottoNumbers,
                };
            }
        });

        return {
            userId,
            purchasedLottos,
        };
    }

    // 구매한 로또에 대해 단일 건을 save 하도록 구현돼 있으나 실제로는 다중 건을 save 할 수 있어야 함
    async createLotto(
        userId: UserId,
        gameId: GameId,
        numbers: number[],
        purchaseDate: Datetime,
    ) {
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
        // const lotto: Lotto = new Lotto({
        // lottoId,
        // userId,
        // gameId,
        // lottoNumbers,
        // purchaseDate,
        // });

        // const game: Game = this.gameRepository.findOneByGameId(gameId);
        // if (!game) {
        // 에러 메시지 정의 해야함
        // 시작되지 않은 게임이면 예외처리
        // throw notFound();
        // }
        // if (game.didPull()) {
        // lotto.calculateWinningNumbers(game.getnumbers(), game.getbonus());
        // }
        // this.lottoRepository.save([lotto]);
    }

    /**
     * array의 중복되는 element를 제거하고 새로운 array를 반환한다.
     *
     * @param array 중복되는 element가 있는 array
     */
    private removeDuplicateElements<T>(array: T[]): T[] {
        const set = new Set(array);
        return [...set];
    }

    /**
     * 구매한 로또의 당첨 여부를 계산한다
     *
     * @param lottos Lotto[]
     */
    private caculateWinningNumbers(lottos: Lotto[]) {
        // const lottosNotPulled = lottos.filter(lotto => !lotto.didPull());
        // const gameIds = lottosNotPulled.map(lotto => lotto.getGameId());
        // const uniqueGameIds = this.removeDuplicateElements<number>(gameIds);
        // const games = this.gameRepository.findByGameIds(uniqueGameIds);
        // for (const lotto of lottosNotPulled) {
        // const game = games.find(
        // game => game.getGameId() === lotto.getGameId(),
        // );
        // if (game.didPull()) {
        // lotto.calculateWinningNumbers(
        // game.getnumbers(),
        // game.getbonus(),
        // );
        // }
    }
    // this.lottoRepository.save(lottosNotPulled);
}
// }

function calculateRank(lottoNumbers: LottoNumber[]): number {
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
            // 에러
        }
    });
    if (before === 0) {
        if (win + bonus + not !== 6) {
            // 에러
        }
    } else {
        if (before !== 6) {
            /// 에러
        }
    }

    if (bonus > 1) {
        // 에러
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

function findIndex<T>(list: Array<T>, key: string, value: any): number {
    for (var i = 0; i < list.length; i++) {
        if (list[i][key] === value) {
            return i;
        }
    }
    return -1;
}
