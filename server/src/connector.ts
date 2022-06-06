import {Pool} from 'pg';

const {POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT} = process.env;

export default new Pool({
  connectionString: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:${POSTGRES_PORT}/${POSTGRES_DB}`
});