// Joi로 validation을 사용할 떄, 공통되는 data type을 export해서 사용한다.
import { Joi } from 'koa-joi-router';

export const LottoJoi = {
    _id: Joi.number(),
    drawNo: Joi.number(),
    numbers: Joi.array()
        .items(Joi.string())
        .length(6),
    bonus: Joi.string(),
};
