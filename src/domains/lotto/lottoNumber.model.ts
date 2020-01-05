import { StateOfNumber } from './lotto.types';

interface Cntr {
    number: number;
    state?: StateOfNumber;
}
export class LottoNumber {
    number: number;
    state: StateOfNumber;

    constructor({ number, state }: Cntr) {
        this.number = number;
        this.state = state || 'BEFORE';
    }
}
