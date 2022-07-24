import client from "../database";
import bcrypt from 'bcrypt';

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
};

export class userStore {
    public async index() : Promise<User[]> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }

    public async show(id: number): Promise<null | User> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return null;
    }

    public async create(user: User): Promise<null | User> {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *;';
            const hashed_password = bcrypt.hashSync(user.password + (process.env.BCRYPT_PASSWORD as string), parseInt(process.env.SALT_ROUNDS as string))
            const result = await conn.query(sql, [user.firstName, user.lastName, hashed_password]);
            conn.release();
            return result.rows[0];
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return null;
    }
}