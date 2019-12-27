import { Joi } from 'koa-joi-router';

export const validateUserId = () =>
    Joi.number()
        .min(0)
        .description('userId');

export const validateNickname = () =>
    Joi.string()
        .max(50)
        .description('nickname');

export const validatePassword = () =>
    Joi.string()
        .max(100)
        .description('password');
