import { PageSyncDeviceController } from "../../../application/controllers/WebView/PageSyncDeviceController";
import { PageSyncDeviceUseCase } from "../../../domain/useCases/WebView/PageSyncDevice/PageSyncDeviceUseCase";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository"

export const PageSyncDeviceFactory = () => {
  const deviceRepo = new DeviceRepository();

  const useCase = new PageSyncDeviceUseCase(
    deviceRepo
  );

  const controller = new PageSyncDeviceController(useCase);

  return controller;
}