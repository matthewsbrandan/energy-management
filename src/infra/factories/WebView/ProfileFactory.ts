import { ProfileController } from "../../../application/controllers/WebView/ProfileController";
import { ProfileUseCase } from "../../../domain/useCases/WebView/Profile/ProfileUseCase";

export const ProfileFactory = () => {
  const useCase = new ProfileUseCase();

  const controller = new ProfileController(useCase);

  return controller;
}