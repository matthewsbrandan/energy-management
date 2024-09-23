
import { Router } from "express"
import { FindAllDeviceTypesFactory } from "../../factories/DeviceType/FindAllDeviceTypesFactory";
import { StoreDeviceTypeFactory } from "../../factories/DeviceType/StoreDeviceTypeFactory";
import { UpdateDeviceTypeFactory } from "../../factories/DeviceType/UpdateDeviceTypeFactory";
import { DeleteDeviceTypeFactory } from "../../factories/DeviceType/DeleteDeviceTypeFactory";
import { FindByIdDeviceTypeFactory } from "../../factories/DeviceType/FindByIdDeviceTypeFactory";
import { route } from "../routenames";

const deviceTypeRouter = Router()

deviceTypeRouter.get(route.api.device_type.get(), (req, res) => FindAllDeviceTypesFactory().handle(req,res))
deviceTypeRouter.get(route.api.device_type.find_one(':id'), (req, res) => FindByIdDeviceTypeFactory().handle(req,res))
deviceTypeRouter.post(route.api.device_type.store(), (req, res) => StoreDeviceTypeFactory().handle(req,res))
deviceTypeRouter.put(route.api.device_type.update(':id'), (req, res) => UpdateDeviceTypeFactory().handle(req,res))
deviceTypeRouter.delete(route.api.device_type.delete(':id'), (req, res) => DeleteDeviceTypeFactory().handle(req,res))

export { deviceTypeRouter };
