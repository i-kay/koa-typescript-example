import { Joi } from 'koa-joi-router';

export const validateUserId = () =>
    Joi.number()
        .min(0)
        .description('userId');

export const validateEmail = () =>
    Joi.string()
        .max(50)
        .description('email');

export const validatePassword = () =>
    Joi.string()
        .max(100)
        .description('password');
