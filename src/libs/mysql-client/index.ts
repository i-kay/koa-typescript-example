import * as mysql from 'mysql';

import { mysql as config } from '../../config';

const mysqlClient = mysql.createPool({
    connectionLimit: 5,
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE,
});

export default mysqlClient;
