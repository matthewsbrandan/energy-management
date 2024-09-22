import { Router } from 'express';
import { route } from '../routenames';
import { HomeFactory } from '../../factories/WebView/HomeFactory';
import authRouter from './auth.route';

const webRouter = Router();

webRouter.get(route.home(), (req, res) => HomeFactory().handle(req,res));
webRouter.use('/auth', authRouter)

export { webRouter };
