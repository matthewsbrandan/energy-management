import { Request, Response } from 'express';

export const HomeController = (req: Request, res: Response) => {
    res.render('index', { message: 'Hello from TypeScript + Express + EJS!' });
};
