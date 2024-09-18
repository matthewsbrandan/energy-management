
import { Router } from "express"
import { FindAllDeviceTypeFactory } from "../../factories/DeviceType/FindAllDeviceTypeFactory";
import { StoreDeviceTypeFactory } from "../../factories/DeviceType/StoreDeviceTypeFactory";

// --prefix: /api/device-type
const deviceTypeRouter = Router()

deviceTypeRouter.get('/', (req, res) => FindAllDeviceTypeFactory().handle(req,res))
deviceTypeRouter.post('/', (req, res) => StoreDeviceTypeFactory().handle(req,res))

export { deviceTypeRouter };
