import { Router } from "express"
import { DeleteDeviceFactory } from "../../factories/Device/DeleteDeviceFactory"
import { FindAllDevicesFactory } from "../../factories/Device/FindAllDevicesFactory"
import { StoreDeviceFactory } from "../../factories/Device/StoreDeviceFactory"
import { UpdateDeviceFactory } from "../../factories/Device/UpdateDeviceFactory"

// --prefix: /api/device
const deviceRouter = Router()

deviceRouter.get('/', (req, res) => FindAllDevicesFactory().handle(req,res))
deviceRouter.post('/', (req, res) => StoreDeviceFactory().handle(req,res))
deviceRouter.put('/:id', (req, res) => UpdateDeviceFactory().handle(req,res))
deviceRouter.delete('/:id', (req, res) => DeleteDeviceFactory().handle(req,res))

export { deviceRouter };