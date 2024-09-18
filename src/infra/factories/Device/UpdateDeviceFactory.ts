import { UpdateDeviceController } from "../../../application/controllers/Device/UpdateDeviceController";
import { UpdateDeviceUseCase } from "../../../domain/useCases/Device/UpdateDevice/UpdateDeviceUseCase";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository"

export const UpdateDeviceFactory = () => {
  const deviceRepo = new DeviceRepository();

  const useCase = new UpdateDeviceUseCase(
    deviceRepo
  );

  const controller = new UpdateDeviceController(useCase);

  return controller;
}