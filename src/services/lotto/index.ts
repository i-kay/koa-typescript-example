import * as lottos from '../../../data/lottos.json';
import { Lotto } from '../../models';

let lottosDuringRuntime = [...lottos];

export const patchLotto = (
    _id: number,
    drawNo: number,
    numbers: string[],
    bonus: string,
) => {
    for (let lotto of lottosDuringRuntime) {
        if (lotto._id === _id) {
            if (drawNo !== undefined) {
                lotto.drawNo = drawNo;
            }
            if (numbers !== undefined) {
                lotto.numbers = numbers;
            }
            if (bonus !== undefined) {
                lotto.bonus = bonus;
            }
            return;
        }
    }
};

export const deleteLotto = (_id: number) => {
    const deleted = lottosDuringRuntime.filter(lotto => lotto._id !== _id);
    lottosDuringRuntime = [...deleted];
};

export const createLotto = (
    drawNo: number,
    numbers: string[],
    bonus: string,
) => {
    const isDuplicatedDrawNo = () => {
        return lottosDuringRuntime.some(lotto => lotto.drawNo === drawNo);
    };
    if (isDuplicatedDrawNo()) {
        return null;
    }

    const createdId = (() => {
        let _id = Math.floor(Math.random() * 100000000);
        let sameIdLottos = lottosDuringRuntime.filter(
            lotto => lotto._id === _id,
        );
        while (sameIdLottos.length > 0) {
            _id--;
            sameIdLottos = lottosDuringRuntime.filter(
                lotto => lotto._id === _id,
            );
        }
        return _id;
    })();

    lottosDuringRuntime.unshift({
        _id: createdId,
        drawNo,
        numbers,
        bonus,
    });
    return createdId;
};

export const findLottosByDrawNo = (
    drawNo: number[],
    offset: number,
    limit: number,
): Lotto[] => {
    let _lottos: Lotto[] = lottosDuringRuntime;
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
