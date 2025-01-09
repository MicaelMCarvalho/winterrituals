import express, { Request, Response } from "express";
import cors from "cors";
import { pool } from "../src/config/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Use env variable in production

app.use(cors());
app.use(express.json());

// Interfaces
interface BaseFestival {
  id?: string;
  name: string;
  location: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  url?: string;
  from_date?: Date;
  to_date?: Date;
  holiday?: string;
}

interface DatabaseFields extends Omit<BaseFestival, "coordinates" | "id"> {
  id: number;
  latitude: string;
  longitude: string;
}

// Authentication Middleware
const authenticateToken: express.RequestHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Authentication token required" });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    }
    (req as any).user = user;
    next();
  });
};

// Database conversion utilities
const databaseFields = [
  "id",
  "name",
  "location",
  "description",
  "latitude",
  "longitude",
  "url",
  "from_date",
  "to_date",
  "holiday",
] as const;

const toApiFormat = (row: DatabaseFields): BaseFestival => {
  const { latitude, longitude, ...rest } = row;
  return {
    ...rest,
    id: row.id.toString(),
    coordinates: {
      lat: Number(latitude),
      lng: Number(longitude),
    },
  };
};

const toDatabaseFormat = (
  festival: BaseFestival,
): Omit<DatabaseFields, "id"> => {
  const { coordinates, id, ...rest } = festival;
  return {
    ...rest,
    latitude: coordinates.lat.toString(),
    longitude: coordinates.lng.toString(),
  };
};

const getSetClause = (fields: string[]): string => {
  return fields
    .filter((field) => field !== "id")
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");
};

// Authentication Routes
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "username and password are required" });
      return;
    }

    // Check if user exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );

    if (existingUser.rows.length > 0) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Hash password and create user
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username",
      [username, passwordHash],
    );

    res.status(201).json({
      message: "User registered successfully",
      user: { id: result.rows[0].id, username: result.rows[0].username },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

app.post("/api/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "username and password are required" });
      return;
    }

    // Find user
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const user = result.rows[0];

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      message: "Logged in successfully",
      token,
      user: { id: user.id, username: user.username},
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Failed to log in" });
  }
});

// Festival Routes - Public
app.get(
  "/api/festivals",
  async (req: Request, res: Response<BaseFestival[]>) => {
    try {
      const result = await pool.query(`
            SELECT ${databaseFields.join(", ")}
            FROM festivals
        `);

      const festivals = result.rows.map(toApiFormat);
      res.json(festivals);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to fetch festivals" } as any);
    }
  },
);

app.get(
  "/api/festivals/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        `SELECT ${databaseFields.join(", ")}
            FROM festivals 
            WHERE id = $1`,
        [id],
      );

      if (result.rows.length === 0) {
        res.status(404).json({ message: "Festival not found" });
        return;
      }

      const festival = toApiFormat(result.rows[0]);
      res.json(festival);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to fetch festival" });
    }
  },
);

// Festival Routes - Protected (Admin only)
app.post(
  "/api/festivals",
  authenticateToken,
  async (
    req: Request<{}, {}, BaseFestival>,
    res: Response<{ id: string; message: string } | { message: string }>,
  ) => {
    try {
      const dbFormat = toDatabaseFormat(req.body);
      const fields = Object.keys(dbFormat);
      const values = Object.values(dbFormat);
      const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

      const result = await pool.query(
        `INSERT INTO festivals (${fields.join(", ")})
            VALUES (${placeholders})
            RETURNING id`,
        values,
      );

      res.status(201).json({
        id: result.rows[0].id.toString(),
        message: "Festival created successfully",
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to create festival" });
    }
  },
);

app.put(
  "/api/festivals/:id",
  authenticateToken,
  async (
    req: Request<{ id: string }, {}, BaseFestival>,
    res: Response<{ message: string; festival?: DatabaseFields }>,
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
        [...values, id],
      );

      if (result.rows.length === 0) {
        res.status(404).json({ message: "Festival not found" });
        return;
      }

      res.json({
        message: "Festival updated successfully",
        festival: result.rows[0],
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to update festival" });
    }
  },
);

app.delete(
  "/api/festivals/:id",
  authenticateToken,
  async (
    req: Request<{ id: string }>,
    res: Response<{ message: string; festival?: DatabaseFields }>,
  ) => {
    try {
      const { id } = req.params;

      const result = await pool.query(
        "DELETE FROM festivals WHERE id = $1 RETURNING *",
        [id],
      );

      if (result.rows.length === 0) {
        res.status(404).json({ message: "Festival not found" });
        return;
      }

      res.json({
        message: "Festival deleted successfully",
        festival: result.rows[0],
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Failed to delete festival" });
    }
  },
);

// Error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!", error: err });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export { app };
