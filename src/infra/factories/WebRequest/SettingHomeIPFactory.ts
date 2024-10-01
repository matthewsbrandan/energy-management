import { SettingHomeIPController } from "../../../application/controllers/WebRequest/SettingHomeIPController";
import { SettingHomeIPUseCase } from "../../../domain/useCases/WebRequest/SettingHomeIP/SettingHomeIPUseCase";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository";
import { UserRepository } from "../../repositories/in-prisma/UserRepository"

export const SettingHomeIPFactory = () => {
  const userRepo = new UserRepository();
  const deviceRepo = new DeviceRepository();

  const useCase = new SettingHomeIPUseCase(
    userRepo,
    deviceRepo
  );

  const controller = new SettingHomeIPController(useCase);

  return controller;
}