import * as mysql from 'mysql';

const connection = mysql.createConnection({
    host: '192.168.0.102',
    user: 'root',
    password: 'zx25932722',
    database: 'lotto',
});

connection.connect();

export default connection;
