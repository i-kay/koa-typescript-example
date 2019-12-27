import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as BodyParser from 'koa-bodyparser';

import routers from './routers';
import dbConn from './libs/mysqlClient';
import { errorHandler } from './middlewares/error-handler';
import { server as config } from './config';

const app = new Koa();

dbConn.ping(err => {
    if (err) {
        throw console.error('db connection error!', err);
    }
    console.log('DB Server responded to ping');
});

// middlewares
app.use(errorHandler);
app.use(BodyParser());
app.use(json());
app.use(logger());
app.use(routers.middleware());

app.listen(config.PORT, () => {
    console.log(`NODE_ENV: ${config.NODE_ENV}`);
    console.log(`server started port#: ${config.PORT}`);
});

app.on('error', (err, ctx) => {
    console.error('error', err);
    /* centralized error handling:
     *   console.log error
     *   write error to log file
     *   save error and request information to database if ctx.request match condition
     *   ...
     */
});
