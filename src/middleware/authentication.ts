import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function check_authentication(req: Request, res: Response, next: NextFunction): boolean{
    if(!req.headers.authorization){
        res.status(401);
        res.json({"Invalid token": "JWT must be provided."});
        return false;
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_TOKEN as string);
        next();
    }catch(err){
        res.status(401);
        res.json({"Invalid token": "This token is invalid"});
    }
    return false;
}
