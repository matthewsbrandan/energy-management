
import { Router } from "express"
import { FindAllDeviceTypesFactory } from "../../factories/DeviceType/FindAllDeviceTypesFactory";
import { StoreDeviceTypeFactory } from "../../factories/DeviceType/StoreDeviceTypeFactory";
import { UpdateDeviceTypeFactory } from "../../factories/DeviceType/UpdateDeviceTypeFactory";
import { DeleteDeviceTypeFactory } from "../../factories/DeviceType/DeleteDeviceTypeFactory";
import { FindByIdDeviceTypeFactory } from "../../factories/DeviceType/FindByIdDeviceTypeFactory";

// --prefix: /api/device-type
const deviceTypeRouter = Router()

deviceTypeRouter.get('/', (req, res) => FindAllDeviceTypesFactory().handle(req,res))
deviceTypeRouter.get('/:id', (req, res) => FindByIdDeviceTypeFactory().handle(req,res))
deviceTypeRouter.post('/', (req, res) => StoreDeviceTypeFactory().handle(req,res))
deviceTypeRouter.put('/:id', (req, res) => UpdateDeviceTypeFactory().handle(req,res))
deviceTypeRouter.delete('/:id', (req, res) => DeleteDeviceTypeFactory().handle(req,res))

export { deviceTypeRouter };
