import express, { Request, Response } from 'express';
import { check_authentication } from '../middleware/authentication';
import { Order, orderStore } from '../models/orders';

const orderRoute = express.Router();
const order_store: orderStore = new orderStore();

orderRoute.get('/', check_authentication, async function (req: Request, res: Response){
    const result = await order_store.index();
    res.json({"Result": result});
})

orderRoute.get('/currentOrder/:user_id', check_authentication, async function (req: Request, res: Response) {
    const result = await order_store.current_order(parseInt(req.params.user_id as string));
    res.json({"Result": result});
})

orderRoute.get('/showCompletedOrders/:user_id', check_authentication, async function (req: Request, res: Response) {
    const result = await order_store.showCompletedOrders(parseInt(req.params.user_id));
    res.json({"Result": result});
})

orderRoute.post('/createOrder', check_authentication, async function (req: Request, res: Response) {
    const order: Order = {id:1, status: req.body.status, user_id: parseInt(req.body.user_id)};
    const result = await order_store.create(order);
    res.json({"Result": result});
})

orderRoute.post('/createOrderWithProducts', check_authentication, async function (req: Request, res: Response) {
    const order: Order = {id:1, status: req.body.status, user_id: parseInt(req.body.user_id)};
    const result = await order_store.createOrderWithProducts(parseInt(req.body.quantity), parseInt(req.body.product_id), parseInt(req.body.order_id));
    res.json({"Result": result});
})

export default orderRoute;