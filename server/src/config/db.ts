import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  max: 20,
  database: "todo_app",
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  port: process.env.DB_PORT as unknown as number,
});

export default pool;
