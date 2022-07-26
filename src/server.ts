import { Request, Response } from 'express';
import bodyParser from 'body-parser'
import productRoute from './handlers/productRoute';
import userRoute from './handlers/userRoute';
import orderRoute from './handlers/orderRoute';
import express from 'express';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json());
app.use('/products', productRoute);
app.use('/users', userRoute);
app.use('/orders', orderRoute);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
});

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
});

export default app;