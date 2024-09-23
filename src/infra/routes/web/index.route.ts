import { Router } from 'express';
import { route } from '../routenames';
import { HomeFactory } from '../../factories/WebView/HomeFactory';
import authRouter from './auth.route';
import { PageSyncDeviceFactory } from '../../factories/WebView/PageSyncDeviceFactory';
import { ProfileFactory } from '../../factories/WebView/ProfileFactory';

const webRouter = Router();

webRouter.get(route.home(), (req, res) => HomeFactory().handle(req,res));
webRouter.get(route.user.profile(), (req, res) => ProfileFactory().handle(req, res));
webRouter.get(route.device.sync(), (req, res) => PageSyncDeviceFactory().handle(req, res));
webRouter.use('/', authRouter) // --prefix: /auth

export { webRouter };
