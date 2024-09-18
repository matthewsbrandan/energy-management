import { UpdateDeviceController } from "../../../application/controllers/Device/UpdateDeviceController";
import { UpdateDeviceUseCase } from "../../../domain/useCases/Device/UpdateDevice/UpdateDeviceUseCase";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository"
import { DeviceTypeRepository } from "../../repositories/in-prisma/DeviceTypeRepository";

export const UpdateDeviceFactory = () => {
  const deviceRepo = new DeviceRepository();
  const deviceTypeRepo = new DeviceTypeRepository();

  const useCase = new UpdateDeviceUseCase(
    deviceRepo,
    deviceTypeRepo
  );

  const controller = new UpdateDeviceController(useCase);

  return controller;
}