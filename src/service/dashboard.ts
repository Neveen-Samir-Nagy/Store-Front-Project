import client from "../database";

export class ordersProducts {
    public async index(): Promise<any[]> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders.id=orders_products.order_id;';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }

    public async current_order(user_id: number): Promise<[] | any[]>{
        try{
           const conn = await client.connect();
           const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders.id=orders_products.order_id WHERE orders.user_id=($1);';
           const result = await conn.query(sql, [user_id]);
           conn.release();
           return result.rows;
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }

    public async showCompletedOrders(user_id: number): Promise<any[]>{
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders.id=orders_products.order_id WHERE orders.user_id=($1) AND orders.status=(S2);';
            const result = await conn.query(sql, [user_id, 'complete']);
            conn.release();
            return result.rows;
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }

    public async showById(id: number): Promise<any[]> {
        try{
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders INNER JOIN orders_products ON orders.id=orders_products.order_id WHERE orders.id=($1);';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows;
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }
}