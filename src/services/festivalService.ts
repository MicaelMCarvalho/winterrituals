import { pool } from '../config/db';
import { Festival } from '../types/festival';

export async function getFestivals(): Promise<Festival[]> {
    try {
        const result = await pool.query(`
            SELECT 
                id, 
                name, 
                location, 
                date, 
                description, 
                latitude, 
                longitude 
            FROM festivals
        `);

        return result.rows.map(row => ({
            id: row.id.toString(),
            name: row.name,
            location: row.location,
            date: row.date,
            description: row.description,
            coordinates: {
                lat: parseFloat(row.latitude),
                lng: parseFloat(row.longitude)
            }
        }));
    } catch (error) {
        console.error('Error fetching festivals:', error);
        throw error;
    }
}
