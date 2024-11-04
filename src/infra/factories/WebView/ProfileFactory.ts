import { ProfileController } from "../../../application/controllers/WebView/ProfileController";
import { ProfileUseCase } from "../../../domain/useCases/WebView/Profile/ProfileUseCase";
import { DeviceRepository } from "../../repositories/in-prisma/DeviceRepository";

export const ProfileFactory = () => {
  const deviceRepo = new DeviceRepository();

  const useCase = new ProfileUseCase(deviceRepo);
  const controller = new ProfileController(useCase);

  return controller;
}