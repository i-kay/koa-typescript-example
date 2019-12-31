import { notFound } from '@hapi/boom';

import { Datetime } from '../../domains/common-types/datetime.type';

import { Game } from '../../domains/game/game.model';
import { Lotto } from '../../domains/lotto/lotto.model';
import { User } from '../../domains/user/user.model';
import { LottoNumber } from '../../domains/lotto/lottoNumber.model';
import { UserId } from '../../domains/user/user.types';
import { GameId, GameState } from '../../domains/game/game.types';
import { LottoId } from '../../domains/lotto/lotto.types';
import { GameRepository } from '../../domains/game/game.repository.interface';
import { LottoRepository } from '../../domains/lotto/lotto.repository.interface';
import { MemoryLottoRepository } from '../../infrastructures/lotto/memory.lotto.repository';
import { MemoryGameRepository } from '../../infrastructures/game/memory.game.repository';
import { UserRepository } from '../../infrastructures/user/user.repository';
import { getConn } from '../../libs/mysql-client';

interface LottoData {
    lottoId: LottoId;
    gameId: GameId;
    lottoNumbers: LottoNumber[];
    gameState: GameState;
    purchaseDate: Datetime;
    rank: number;
}

export class LottoService {
    lottoRepository: LottoRepository = new MemoryLottoRepository();
    gameRepository: GameRepository = new MemoryGameRepository();

    // pagination 처리해야 함
    getLottosByUserId(
        userId: UserId,
    ): {
        userId: UserId;
        lottos: LottoData[];
    } {
        const lottoModels: Lotto[] = this.lottoRepository.findAllByUserId(
            userId,
        );

        if (!lottoModels || lottoModels.length === 0) {
            throw notFound();
        }

        this.caculateWinningNumbers(lottoModels);

        const lottos: LottoData[] = lottoModels.map(lotto => {
            return {
                lottoId: lotto.getLottoId(),
                gameId: lotto.getGameId(),
                lottoNumbers: lotto.getLottoNumbers(),
                gameState: lotto.getGameState(),
                purchaseDate: lotto.getPurchaseDate(),
                rank: lotto.getRank(),
            };
        });

        return {
            userId,
            lottos,
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
        const lottoId = this.lottoRepository.nextLottoId();
        const lottoNumbers: LottoNumber[] = numbers.map(number => {
            return new LottoNumber({ number });
        });
        const lotto: Lotto = new Lotto({
            lottoId,
            userId,
            gameId,
            lottoNumbers,
            purchaseDate,
        });

        const game: Game = this.gameRepository.findOneByGameId(gameId);
        if (!game) {
            // 에러 메시지 정의 해야함
            // 시작되지 않은 게임이면 예외처리
            throw notFound();
        }
        if (game.didPull()) {
            lotto.calculateWinningNumbers(game.getnumbers(), game.getbonus());
        }
        this.lottoRepository.save([lotto]);
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
        const lottosNotPulled = lottos.filter(lotto => !lotto.didPull());
        const gameIds = lottosNotPulled.map(lotto => lotto.getGameId());
        const uniqueGameIds = this.removeDuplicateElements<number>(gameIds);
        const games = this.gameRepository.findByGameIds(uniqueGameIds);

        for (const lotto of lottosNotPulled) {
            const game = games.find(
                game => game.getGameId() === lotto.getGameId(),
            );
            if (game.didPull()) {
                lotto.calculateWinningNumbers(
                    game.getnumbers(),
                    game.getbonus(),
                );
            }
        }
        this.lottoRepository.save(lottosNotPulled);
    }
}
