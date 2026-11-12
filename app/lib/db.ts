import mysql from 'mysql2/promise';

try {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: 3306,
        password: process.env.DB_PASSWORD,
    });

    await connection.end();
} catch (error) {
    console.error(error);
}