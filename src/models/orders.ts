import client from "../database";
import { ordersProducts } from "../service/dashboard";

export type Order = {
    id: number;
    status: string;
    user_id: number;
};

const orders_products: ordersProducts = new ordersProducts();

export class orderStore {

    public async index(): Promise<{}[]> {
        try{
            return orders_products.index();
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }

    public async current_order(user_id: number): Promise<[] | {}[]>{
        try{
           return orders_products.current_order(user_id);
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }

    public async showCompletedOrders(user_id: number): Promise<{}[]>{
        try{
            return orders_products.showCompletedOrders(user_id);
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }

    public async showById(id: number): Promise<any[]> {
        try{
            return orders_products.showById(id);
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }

    public async create(order: Order): Promise<{}> {
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *;';
            const result = await conn.query(sql, [order.status, order.user_id]);
            return result.rows[0];
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return {};
    }

    public async createOrderWithProducts(quantity: number, product_id:number, order_id: number): Promise<[] | {}[]>{
        try{
            const conn = await client.connect();
            const sql = 'INSERT INTO orders_products (quantity, product_id, order_id) VALUES ($1, $2, $3) RETURNING *;';
            const result = await conn.query(sql, [quantity, product_id, order_id]);
            conn.release();
            return result.rows[0];
        }catch(err){
            console.log(`Found error: ${err}`);
        }
        return [];
    }
}