import * as Koa from 'koa';
import * as logger from 'koa-logger';
import * as json from 'koa-json';
import * as BodyParser from 'koa-bodyparser';

import routers from './routers';
import dbConn from './libs/dbConnection';
import { errorHandler } from './middlewares/error-handler';
import { NODE_ENV, PORT } from './config';

const app = new Koa();

// dbConn.ping(err => {
//     if (err) {
//         throw console.error('db connection error!', err);
//     }
//     console.log('DB Server responded to ping');
// });

// middlewares
app.use(errorHandler);
app.use(BodyParser());
app.use(json());
app.use(logger());
app.use(routers.middleware());

app.listen(PORT, () => {
    console.log(`NODE_ENV: ${NODE_ENV}`);
    console.log(`server started port#: ${PORT}`);
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
