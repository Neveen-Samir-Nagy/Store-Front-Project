import client from "../database";

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};

export class productStore {

    public async index(): Promise<Product[]> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }

    public async showById(id: number): Promise<null | Product> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return null;
    }

    public async showByCategory(category: string): Promise<[] | Product[]> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1);';
            const result = await conn.query(sql, [category]);
            conn.release();
            return result.rows;
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }

    public async create(product: Product): Promise<null | Product> {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [product.name, product.price, product.category]);
            conn.release();
            return result.rows[0];
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return null;
    }
}