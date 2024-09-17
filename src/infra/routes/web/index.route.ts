import { Router } from 'express';
import { route } from '../routenames';
import { HomeFactory } from '../../factories/WebView/HomeFactory';

const webRouter = Router();

webRouter.get(route.home(), (req, res) => HomeFactory().handle(req,res));

export { webRouter };
