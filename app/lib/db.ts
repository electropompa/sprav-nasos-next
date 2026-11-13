import mysql from 'mysql2/promise';
import type { RowDataPacket } from 'mysql2';
import "server-only";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: 3306,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10,
});

export async function getTestRows() {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM `categories`');
    return rows;
}