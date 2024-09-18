import { StoreDeviceTypeController } from "../../../application/controllers/DeviceType/StoreDeviceTypeController";
import { StoreDeviceTypeUseCase } from "../../../domain/useCases/DeviceType/StoreDeviceType/StoreDeviceTypeUseCase";
import { DeviceTypeRepository } from "../../repositories/in-prisma/DeviceTypeRepository"

export const StoreDeviceTypeFactory = () => {
  const deviceTypeRepo = new DeviceTypeRepository();

  const useCase = new StoreDeviceTypeUseCase(
    deviceTypeRepo
  );

  const controller = new StoreDeviceTypeController(useCase);

  return controller;
}