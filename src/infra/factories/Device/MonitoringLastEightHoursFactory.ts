import { MonitoringLastEightHoursController } from "../../../application/controllers/Device/MonitoringLastEightHoursController";
import { MonitoringLastEightHoursUseCase } from "../../../domain/useCases/Device/MonitoringLastEightHours/MonitoringLastEightHoursUseCase";
import { DeviceLogRepository } from "../../repositories/in-prisma/DeviceLogRepository";

export const MonitoringLastEightHoursFactory = () => {
  const deviceLog = new DeviceLogRepository();

  const useCase = new MonitoringLastEightHoursUseCase(
    deviceLog
  );

  const controller = new MonitoringLastEightHoursController(useCase);

  return controller;
}