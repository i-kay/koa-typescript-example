import { Joi } from 'koa-joi-router';

export const validateGameIdList = () =>
    Joi.array()
        .items(Joi.number().min(1))
        .required()
        .description('GameId');

export const validateGameId = () =>
    Joi.number()
        .min(1)
        .required()
        .description('GameId');

export const validateLottoNumber = () =>
    Joi.number()
        .min(1)
        .max(45);

export const validateLottoNumbers = () =>
    Joi.array()
        .items(validateLottoNumber())
        .length(7);
