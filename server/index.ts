import express, { Request, Response } from 'express';
import cors from 'cors';
import { pool } from '../src/config/db';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

interface BaseFestival {
    id?: string;
    name: string;
    location: string;
    date: string;
    description: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    url?: string;
    from_date?: Date;
    to_date?: Date;
}

interface DatabaseFields extends Omit<BaseFestival, 'coordinates' | 'id'> {
    id: number;
    latitude: string;
    longitude: string;
}

// Explicitly define database fields
const databaseFields = [
    'id',
    'name',
    'location',
    'date',
    'description',
    'latitude',
    'longitude',
    'url',
    'from_date',
    'to_date'
] as const;

// Convert database row to API format
const toApiFormat = (row: DatabaseFields): BaseFestival => {
    const { latitude, longitude, ...rest } = row;
    return {
        ...rest,
        id: row.id.toString(),
        coordinates: {
            lat: Number(latitude),
            lng: Number(longitude)
        }
    };
};

// Convert API format to database format
const toDatabaseFormat = (festival: BaseFestival): Omit<DatabaseFields, 'id'> => {
    const { coordinates, id, ...rest } = festival;
    return {
        ...rest,
        latitude: coordinates.lat.toString(),
        longitude: coordinates.lng.toString()
    };
};

// Generate SET clause for UPDATE
const getSetClause = (fields: string[]): string => {
    return fields
        .filter(field => field !== 'id')
        .map((field, index) => `${field} = $${index + 1}`)
        .join(', ');
};

// Routes
app.get('/api/festivals', async (req: Request, res: Response<BaseFestival[]>) => {
    try {
        const result = await pool.query(`
            SELECT ${databaseFields.join(', ')}
            FROM festivals
        `);
        
        const festivals = result.rows.map(toApiFormat);
        res.json(festivals);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to fetch festivals' } as any);
    }
});

app.get('/api/festivals/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT ${databaseFields.join(', ')}
            FROM festivals 
            WHERE id = $1`,
            [id]
        );
        
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Festival not found' });
            return;
        }
        
        const festival = toApiFormat(result.rows[0]);
        res.json(festival);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to fetch festival' });
    }
});

app.post('/api/festivals', async (
    req: Request<{}, {}, BaseFestival>,
    res: Response<{ id: string; message: string } | { message: string }>
) => {
    try {
        const dbFormat = toDatabaseFormat(req.body);
        const fields = Object.keys(dbFormat);
        const values = Object.values(dbFormat);
        const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
        
        const result = await pool.query(
            `INSERT INTO festivals (${fields.join(', ')})
            VALUES (${placeholders})
            RETURNING id`,
            values
        );
        
        res.status(201).json({
            id: result.rows[0].id.toString(),
            message: 'Festival created successfully'
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to create festival' });
    }
});

app.put('/api/festivals/:id', async (
    req: Request<{ id: string }, {}, BaseFestival>,
    res: Response<{ message: string; festival?: DatabaseFields }>
) => {
    try {
        const { id } = req.params;
        const dbFormat = toDatabaseFormat(req.body);
        const fields = Object.keys(dbFormat);
        const values = Object.values(dbFormat);
        
        const result = await pool.query(
            `UPDATE festivals 
            SET ${getSetClause(fields)}
            WHERE id = $${fields.length + 1}
            RETURNING *`,
            [...values, id]
        );
        
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Festival not found' });
            return;
        }
        
        res.json({
            message: 'Festival updated successfully',
            festival: result.rows[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to update festival' });
    }
});

app.delete('/api/festivals/:id', async (
    req: Request<{ id: string }>,
    res: Response<{ message: string; festival?: DatabaseFields }>
) => {
    try {
        const { id } = req.params;
        
        const result = await pool.query(
            'DELETE FROM festivals WHERE id = $1 RETURNING *',
            [id]
        );
        
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Festival not found' });
            return;
        }
        
        res.json({
            message: 'Festival deleted successfully',
            festival: result.rows[0]
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to delete festival' });
    }
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!', error: err });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export { app };
