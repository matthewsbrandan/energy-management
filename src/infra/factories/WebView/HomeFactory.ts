import { HomeController } from "../../../application/controllers/WebView/HomeController";
import { HomeUseCase } from "../../../domain/useCases/WebView/Home/HomeUseCase";

export const HomeFactory = () => {
  const useCase = new HomeUseCase();

  const controller = new HomeController(useCase);

  return controller;
}