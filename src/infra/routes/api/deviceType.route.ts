
import { Router } from "express"
import { FindAllDeviceTypeFactory } from "../../factories/DeviceType/FindAllDeviceTypeFactory";
import { StoreDeviceTypeFactory } from "../../factories/DeviceType/StoreDeviceTypeFactory";
import { UpdateDeviceTypeFactory } from "../../factories/DeviceType/UpdateDeviceTypeFactory";
import { DeleteDeviceTypeFactory } from "../../factories/DeviceType/DeleteDeviceTypeFactory";

// --prefix: /api/device-type
const deviceTypeRouter = Router()

deviceTypeRouter.get('/', (req, res) => FindAllDeviceTypeFactory().handle(req,res))
deviceTypeRouter.post('/', (req, res) => StoreDeviceTypeFactory().handle(req,res))
deviceTypeRouter.put('/:id', (req, res) => UpdateDeviceTypeFactory().handle(req,res))
deviceTypeRouter.delete('/:id', (req, res) => DeleteDeviceTypeFactory().handle(req,res))

export { deviceTypeRouter };
