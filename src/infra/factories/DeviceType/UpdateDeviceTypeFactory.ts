import { UpdateDeviceTypeController } from "../../../application/controllers/DeviceType/UpdateDeviceTypeController";
import { UpdateDeviceTypeUseCase } from "../../../domain/useCases/DeviceType/UpdateDeviceType/UpdateDeviceTypeUseCase";
import { DeviceTypeRepository } from "../../repositories/in-prisma/DeviceTypeRepository"

export const UpdateDeviceTypeFactory = () => {
  const deviceTypeRepo = new DeviceTypeRepository();

  const useCase = new UpdateDeviceTypeUseCase(
    deviceTypeRepo
  );

  const controller = new UpdateDeviceTypeController(useCase);

  return controller;
}