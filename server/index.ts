import express, { Request, Response } from 'express';
import { pool } from '../src/config/db';

const app = express();
const port = process.env.PORT || 3001;

interface Festival {
  id: string;
  name: string;
  location: string;
  date: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface DatabaseRow {
  id: number;
  name: string;
  location: string;
  date: string;
  description: string;
  latitude: string;
  longitude: string;
}

app.use(express.json());

app.get('/api/festivals', async (req: Request, res: Response) => {
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
    
    const festivals: Festival[] = result.rows.map((row: DatabaseRow) => ({
      id: row.id.toString(),
      name: row.name,
      location: row.location,
      date: row.date,
      description: row.description,
      coordinates: {
        lat: Number(row.latitude),
        lng: Number(row.longitude)
      }
    }));

    res.json(festivals);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to fetch festivals' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
