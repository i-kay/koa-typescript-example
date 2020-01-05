import { Lotto } from './lotto.model';
import { UserId } from '../user/user.types';
import { LottoId } from './lotto.types';

export interface LottoRepository {
    findByUserId(userId: UserId): Promise<Lotto[]>;
    save(Lotto: Lotto[]): Promise<LottoId[]>;
}
