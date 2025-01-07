import { Pool } from 'pg';
import { validateEnv } from './env';

validateEnv();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432')
});

export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Database connected successfully');
    const result = await client.query('SELECT NOW()');
    console.log('Database time:', result.rows[0]);
    client.release();
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}
