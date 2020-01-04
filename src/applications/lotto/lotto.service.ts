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
