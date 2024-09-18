import { StoreDeviceController } from "../../../application/controllers/Device/StoreDeviceController";
import { StoreDeviceUseCase } from "../../../domain/useCases/Device/StoreDevice/StoreDeviceUseCase";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository"
import { DeviceTypeRepository } from "../../repositories/in-prisma/DeviceTypeRepository";

export const StoreDeviceFactory = () => {
  const deviceRepo = new DeviceRepository();
  const deviceTypeRepo = new DeviceTypeRepository();

  const useCase = new StoreDeviceUseCase(
    deviceRepo,
    deviceTypeRepo
  );

  const controller = new StoreDeviceController(useCase);

  return controller;
}