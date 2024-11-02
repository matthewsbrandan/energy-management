import { TogglerLastEightHoursController } from "../../../application/controllers/Device/TogglerLastEightHoursController";
import { TogglerLastEightHoursUseCase } from "../../../domain/useCases/Device/TogglerLastEightHours/TogglerLastEightHoursUseCase";
import { DeviceLogRepository } from "../../repositories/in-prisma/DeviceLogRepository";

export const TogglerLastEightHoursFactory = () => {
  const deviceLogRepo = new DeviceLogRepository();

  const useCase = new TogglerLastEightHoursUseCase(
    deviceLogRepo
  );

  const controller = new TogglerLastEightHoursController(useCase);

  return controller;
}