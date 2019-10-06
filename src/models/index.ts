export interface Lotto {
    _id: number;
    drawNo: number;
    numbers: string[];
    bonus: string;
}

export interface User {
    _id: number;
    userId: string;
    passWd: string;
    authority: string;
}
