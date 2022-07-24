import express, { Request, Response } from 'express';
import { Product, productStore } from '../models/products';
import { check_authentication } from '../middleware/authentication';


const productRoute = express.Router();
const product_store: productStore = new productStore();

productRoute.get('/', async function (req: Request, res: Response) {
    const result = await product_store.index();
    res.json({"Result": result});
});

productRoute.get('/showById/:id', async function (req: Request, res: Response) {
    const result = await product_store.showById(parseInt(req.params.id as string));
    res.json({"Result": result});
});

productRoute.get('/showByCategory/:category', async function (req: Request, res: Response) {
    const result = await product_store.showByCategory((req.params.category as string));
    res.json({"Result": result});
});

productRoute.post('/create', check_authentication, async function (req: Request, res: Response) {
    const product: Product = {id:1, name: req.body.name, price: parseInt(req.body.price), category: req.body.category};
    const result = await product_store.create(product);
    res.json({"Result": result});
});

export default productRoute;