import { FindByIdDeviceTypeController } from "../../../application/controllers/DeviceType/FindByIdDeviceTypeController";
import { FindByIdDeviceTypeUseCase } from "../../../domain/useCases/DeviceType/FindByIdDeviceType/FindByIdDeviceTypeUseCase";
import { DeviceTypeRepository } from "../../repositories/in-prisma/DeviceTypeRepository"

export const FindByIdDeviceTypeFactory = () => {
  const deviceTypeRepo = new DeviceTypeRepository();

  const useCase = new FindByIdDeviceTypeUseCase(
    deviceTypeRepo
  );

  const controller = new FindByIdDeviceTypeController(useCase);

  return controller;
}