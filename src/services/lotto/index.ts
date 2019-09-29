import * as lottos from '../../../data/lottos.json';
import { Lotto } from '../../models';

export const findLottosByDrawNo = (
    drawNo: number[],
    offset: number,
    limit: number,
): Lotto[] => {
    let _lottos: Lotto[] = lottos;
    let _limit: number = limit;
    if (drawNo.length > 0) {
        _lottos = lottos.filter(lotto => drawNo.includes(lotto.drawNo));
    }
    if (limit === 0) {
        _limit = _lottos.length;
    }
    _lottos = _lottos.slice(offset, offset + _limit);

    return _lottos;
};
