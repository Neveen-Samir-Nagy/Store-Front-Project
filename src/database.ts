import dotenv from 'dotenv';
import { Pool, PoolClient } from 'pg';

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_DATABASE,
    POSTGRES_DATABASE_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    ENV
} = process.env;

let client: Pool;

if(ENV == "dev"){
    client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        database: POSTGRES_DATABASE,
        password: POSTGRES_PASSWORD
    });
}else{
    client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        database: POSTGRES_DATABASE_TEST,
        password: POSTGRES_PASSWORD
    });
}

export default client;