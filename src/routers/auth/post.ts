import { Spec, Joi } from 'koa-joi-router';
import * as jwt from 'jsonwebtoken';
import { findUserById } from '../../services/user';

const router: Spec = {
    method: 'post',
    path: '/',
    meta: {
        swagger: {
            summary: 'API 인증',
            description: 'API를 사용하기 위한 jwt를 발급받는 인증',
            tags: ['auth'],
        },
    },
    validate: {
        body: {
            userId: Joi.string().max(50),
            passWd: Joi.string().max(200),
        },
        type: 'json',
        output: {
            '200,201': {
                body: {
                    success: Joi.boolean(),
                    jwt: Joi.string(),
                },
            },
            '400-499': {
                body: {
                    success: Joi.boolean(),
                    msg: Joi.string(),
                },
            },
        },
    },
    handler: async ctx => {
        const { userId, passWd } = ctx.request.body;
        const user = findUserById(userId);
        if (!user) {
            ctx.response.status = 404;
            // 정형화된 response status, body 메시지 작업은 실제 API 구현시 필요하다.
            ctx.body = {
                success: false,
                msg: 'User not found',
            };
        } else {
            if (user.passWd !== passWd) {
                ctx.response.status = 403;
                ctx.body = {
                    success: false,
                    msg: 'passWd does not match',
                };
            } else {
                ctx.response.status = 201;
                const token = jwt.sign(
                    { authority: user.authority },
                    'privateKey',
                );
                ctx.body = {
                    success: true,
                    jwt: token,
                };
            }
        }
    },
};

export default router;
