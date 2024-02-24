import mysql from "mysql";

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'meubdd.root',
    database: 'bdbiblioteca'
});

export default connection;
