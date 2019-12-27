import { Joi } from 'koa-joi-router';

export const Datetime = () =>
    Joi.string().description('2018-11-04T19:12:00.000Z');
