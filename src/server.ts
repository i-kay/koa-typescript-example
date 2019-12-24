import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as BodyParser from 'koa-bodyparser';
import routers from './routers';
import { nodeEnv, host, port } from './config';

const app = new Koa();

// middlewares
app.use(BodyParser());
app.use(json());
app.use(logger());
app.use(routers.middleware());

app.listen(port, () => {
    console.log(`environment: ${nodeEnv}`);
    console.log(`koa started at port:${port}`);
});
