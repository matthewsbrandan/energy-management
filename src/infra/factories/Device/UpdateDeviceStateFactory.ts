import { UpdateDeviceStateController } from "../../../application/controllers/Device/UpdateDeviceStateController";
import { UpdateDeviceStateUseCase } from "../../../domain/useCases/Device/UpdateDeviceState/UpdateDeviceStateUseCase";
import { DeviceLogRepository } from "../../repositories/in-prisma/DeviceLogRepository";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository"

export const UpdateDeviceStateFactory = () => {
  const deviceRepo = new DeviceRepository();
  const deviceLogRepo = new DeviceLogRepository();

  const useCase = new UpdateDeviceStateUseCase(
    deviceRepo,
    deviceLogRepo
  );

  const controller = new UpdateDeviceStateController(useCase);

  return controller;
}