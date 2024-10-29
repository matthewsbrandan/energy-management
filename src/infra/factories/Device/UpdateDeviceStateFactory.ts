import { UpdateDeviceStateController } from "../../../application/controllers/Device/UpdateDeviceStateController";
import { UpdateDeviceStateUseCase } from "../../../domain/useCases/Device/UpdateDeviceState/UpdateDeviceStateUseCase";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository"

export const UpdateDeviceStateFactory = () => {
  const deviceRepo = new DeviceRepository();

  const useCase = new UpdateDeviceStateUseCase(
    deviceRepo
  );

  const controller = new UpdateDeviceStateController(useCase);

  return controller;
}