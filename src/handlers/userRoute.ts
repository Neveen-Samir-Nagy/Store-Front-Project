import express, { Request, Response } from 'express';
import { check_authentication } from '../middleware/authentication';
import { User, userStore } from '../models/users';
import jwt from 'jsonwebtoken';

const userRoute = express.Router();
const user_store: userStore = new userStore();

userRoute.get('/', check_authentication, async function (req: Request, res: Response) {
    const result = await user_store.index();
    res.json({"Result": result});
})

userRoute.get('/showById/:id', check_authentication, async function (req: Request, res: Response) {
    const result = await user_store.show(parseInt(req.params.id));
    res.json({"Result": result});
})

userRoute.post('/create', async function (req: Request, res: Response){
    const user: User = {id:1, firstName: req.body.firstName, lastName: req.body.lastName, password: req.body.password};
    const result = await user_store.create(user);
    const token = jwt.sign({newUser: result}, process.env.SECRET_TOKEN as string);
    res.json({"Result": token});
})

export default userRoute;