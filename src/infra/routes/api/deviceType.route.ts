
import { Router } from "express"
import { FindAllDeviceTypeFactory } from "../../factories/DeviceType/FindAllDeviceTypeFactory";

// --prefix: /api/device-type
const deviceTypeRouter = Router()

deviceTypeRouter.get('/', (req, res) => FindAllDeviceTypeFactory().handle(req,res))

export { deviceTypeRouter };
