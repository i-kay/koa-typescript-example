import { Lotto } from './lotto.model';
import { LottoId } from './lotto.types';
import { UserId } from '../user/user.types';

export interface LottoRepository {
    // pagination 구현 필요
    findAllByUserId(userId: UserId): Lotto[];
    save(lottos: Lotto[]): void;
    nextLottoId(): LottoId;
}
