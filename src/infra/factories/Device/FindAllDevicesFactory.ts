import { FindAllDevicesController } from "../../../application/controllers/Device/FindAllDevicesController";
import { FindAllDevicesUseCase } from "../../../domain/useCases/Device/FindAllDevices/FindAllDevicesUseCase";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository"

export const FindAllDevicesFactory = () => {
  const deviceRepo = new DeviceRepository();

  const useCase = new FindAllDevicesUseCase(
    deviceRepo
  );

  const controller = new FindAllDevicesController(useCase);

  return controller;
}