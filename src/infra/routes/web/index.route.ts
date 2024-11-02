import { Router } from 'express';
import { route } from '../routenames';
import { HomeFactory } from '../../factories/WebView/HomeFactory';
import authRouter from './auth.route';
import { PageSyncDeviceFactory } from '../../factories/WebView/PageSyncDeviceFactory';
import { ProfileFactory } from '../../factories/WebView/ProfileFactory';
import { SettingHomeIPFactory } from '../../factories/WebRequest/SettingHomeIPFactory';
import { SyncDeviceFactory } from '../../factories/Device/SyncDeviceFactory';
import { UpdateDeviceStateFactory } from '../../factories/Device/UpdateDeviceStateFactory';

const webRouter = Router();

webRouter.get(route.home(), (req, res) => HomeFactory().handle(req,res));
webRouter.get(route.user.profile(), (req, res) => ProfileFactory().handle(req, res));
webRouter.post(route.user.setting.home_ip(), (req, res) => SettingHomeIPFactory().handle(req, res))
webRouter.get(route.device.sync(), (req, res) => PageSyncDeviceFactory().handle(req, res));
webRouter.post(route.device.store_sync(':id'), (req, res) => SyncDeviceFactory().handle(req, res));
webRouter.post(route.device.state(':id'), (req, res) => UpdateDeviceStateFactory().controller.handle(req, res));
webRouter.use('/', authRouter) // --prefix: /auth

export { webRouter };
