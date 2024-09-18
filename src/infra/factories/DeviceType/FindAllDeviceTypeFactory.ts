import { FindAllDeviceTypeController } from "../../../application/controllers/DeviceType/FindAllDeviceTypeController";
import { FindAllDeviceTypeUseCase } from "../../../domain/useCases/DeviceType/FindAllDeviceType/FindAllDeviceTypeUseCase";
import { DeviceTypeRepository } from "../../repositories/in-prisma/DeviceTypeRepository"

export const FindAllDeviceTypeFactory = () => {
  const deviceTypeRepo = new DeviceTypeRepository();

  const useCase = new FindAllDeviceTypeUseCase(
    deviceTypeRepo
  );

  const controller = new FindAllDeviceTypeController(useCase);

  return controller;
}