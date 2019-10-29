import * as lottos from '../../../data/lottos.json';
import { Lotto } from '../../models';

let lottosFromData = [...lottos];

export const patchLotto = (
    _id: number,
    drawNo: number,
    numbers: string[],
    bonus: string,
): boolean => {
    for (const lotto of lottosFromData) {
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
            return true;
        }
    }
    return false;
};

export const deleteLotto = (_id: number): boolean => {
    const deletedResult = lottosFromData.filter(lotto => lotto._id !== _id);
    const lengthBeforeDeletion = lottosFromData.length;
    lottosFromData = [...deletedResult];
    if (deletedResult.length === lengthBeforeDeletion) {
        return false;
    } else {
        return true;
    }
};

export const createLotto = (
    drawNo: number,
    numbers: string[],
    bonus: string,
): number | null => {
    const isDuplicatedDrawNo = (): boolean => {
        return lottosFromData.some(lotto => lotto.drawNo === drawNo);
    };
    if (isDuplicatedDrawNo()) {
        return null;
    }

    const createdId = ((): number => {
        let _id = Math.floor(Math.random() * 100000000);
        let sameIdLottos = lottosFromData.filter(lotto => lotto._id === _id);
        while (sameIdLottos.length > 0) {
            _id--;
            sameIdLottos = lottosFromData.filter(lotto => lotto._id === _id);
        }
        return _id;
    })();

    lottosFromData.unshift({
        _id: createdId,
        drawNo,
        numbers,
        bonus,
    });
    return createdId;
};

export const findLottosByDrawNo = (drawNoList: number[]): Lotto[] => {
    return lottosFromData.filter(lotto => drawNoList.includes(lotto.drawNo));
};
