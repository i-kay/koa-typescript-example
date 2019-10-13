// 아래와 같이 API 문서를 구현했지만 조화가 잘 안되고 반복이 많이 되는 것 같다.
// 나중에 오픈소스가 나오길 기다리거나 내가 직접 수정하거나 구현해야 할 것 같다.

import * as Router from 'koa-joi-router';
const { SwaggerAPI } = require('koa-joi-router-docs');

import auth from '../auth';
import lottos from '../lottos';

const apiDocs = Router();

// 라우터가 추가해 줘야 apiDocs에서 보인다.
const authRouter = Router().route(auth.routes);
const lottoRouter = Router().route(lottos.routes);

const generator = new SwaggerAPI();

// prefix 부분이 타입이 지원 잘 안되서 괴상하다.
generator.addJoiRouter(authRouter, { prefix: auth['router'].opts.prefix });
generator.addJoiRouter(lottoRouter, { prefix: lottos['router'].opts.prefix });

const spec = generator.generateSpec(
    {
        info: {
            title: 'Typescript Koa Example API',
            description: 'API for creating and editing examples.',
            version: '1.0.0',
        },
        basePath: '/',
        tags: [
            {
                name: 'auth',
                description: '인증과 관련된 API',
            },
            {
                name: 'lottos',
                description: 'lotto와 관련된 API',
            },
        ],
    },
    {
        defaultResponses: {}, // Custom default responses if you don't like default 200
    },
);

/**
 * Swagger JSON API
 */
apiDocs.get('/api.json', async ctx => {
    ctx.body = JSON.stringify(spec, null, '  ');
});

/**
 * API documentation
 */
apiDocs.get('/api-docs', async ctx => {
    ctx.body = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Example API</title>
    </head>
    <body>
      <redoc spec-url='/api.json' lazy-rendering></redoc>
      <script src="https://rebilly.github.io/ReDoc/releases/latest/redoc.min.js"></script>
    </body>
    </html>
    `;
});

export default apiDocs;
