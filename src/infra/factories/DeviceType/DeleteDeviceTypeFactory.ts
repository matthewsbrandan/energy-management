import { DeleteDeviceTypeController } from "../../../application/controllers/DeviceType/DeleteDeviceTypeController";
import { DeleteDeviceTypeUseCase } from "../../../domain/useCases/DeviceType/DeleteDeviceType/DeleteDeviceTypeUseCase";
import { DeviceTypeRepository } from "../../repositories/in-prisma/DeviceTypeRepository"

export const DeleteDeviceTypeFactory = () => {
  const deviceTypeRepo = new DeviceTypeRepository();

  const useCase = new DeleteDeviceTypeUseCase(
    deviceTypeRepo
  );

  const controller = new DeleteDeviceTypeController(useCase);

  return controller;
}