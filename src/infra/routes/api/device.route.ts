import { Router } from "express"
import { DeleteDeviceFactory } from "../../factories/Device/DeleteDeviceFactory"
import { FindAllDevicesFactory } from "../../factories/Device/FindAllDevicesFactory"
import { StoreDeviceFactory } from "../../factories/Device/StoreDeviceFactory"
import { UpdateDeviceFactory } from "../../factories/Device/UpdateDeviceFactory"
import { route } from "../routenames"
import { UpdateDeviceStateFactory } from "../../factories/Device/UpdateDeviceStateFactory"

const deviceRouter = Router()

deviceRouter.get(route.api.device.get(), (req, res) => FindAllDevicesFactory().controller.handle(req,res))
deviceRouter.post(route.api.device.store(), (req, res) => StoreDeviceFactory().controller.handle(req,res))
deviceRouter.put(route.api.device.update(':id'), (req, res) => UpdateDeviceFactory().controller.handle(req,res))
deviceRouter.put(route.api.device.state(':id'), (req, res) => UpdateDeviceStateFactory().controller.handle(req,res, true))
deviceRouter.delete(route.api.device.delete(':id'), (req, res) => DeleteDeviceFactory().handle(req,res))

export { deviceRouter };