import { Joi } from 'koa-joi-router';

import { validateLottoNumber } from '../game/game.validators.joi';

export const validatePurchaseId = () =>
    Joi.number()
        .min(1)
        .required()
        .description('purchaseId');

export const validateLottoNumbersList = () =>
    Joi.array()
        .items(
            Joi.array()
                .items(validateLottoNumber())
                .length(6),
        )
        .min(1)
        .max(5);
