import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as BodyParser from 'koa-bodyparser';
import routers from './routers';

const app = new Koa();

// Middlewares
app.use(BodyParser());
app.use(json());
app.use(logger());
app.use(routers.routes());

app.listen(3000, () => {
    console.log('Koa started');
});
