import { DeleteDeviceController } from "../../../application/controllers/Device/DeleteDeviceController";
import { DeleteDeviceUseCase } from "../../../domain/useCases/Device/DeleteDevice/DeleteDeviceUseCase";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository"

export const DeleteDeviceFactory = () => {
  const deviceRepo = new DeviceRepository();

  const useCase = new DeleteDeviceUseCase(
    deviceRepo
  );

  const controller = new DeleteDeviceController(useCase);

  return controller;
}