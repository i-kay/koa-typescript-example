import { Lotto } from './lotto.model';
import { UserId } from '../user/user.types';

export interface LottoRepository {
    findByUserId(userId: UserId): Promise<Lotto[]>;
}
