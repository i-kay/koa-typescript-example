import * as mysql from 'mysql2/promise';

import { mysql as config } from '../../config';
import { Connection } from 'mysql2/promise';

export const getConn: () => Promise<Connection> = async () => {
    const conn = await mysql.createConnection({
        host: config.MYSQL_HOST,
        user: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DATABASE,
    });
    return conn;
};
