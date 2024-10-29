import { SyncDeviceController } from "../../../application/controllers/Device/SyncDeviceController";
import { SyncDeviceUseCase } from "../../../domain/useCases/Device/SyncDevice/SyncDeviceUseCase";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository"

export const SyncDeviceFactory = () => {
  const deviceRepo = new DeviceRepository();

  const useCase = new SyncDeviceUseCase(
    deviceRepo
  );

  const controller = new SyncDeviceController(useCase);

  return controller;
}