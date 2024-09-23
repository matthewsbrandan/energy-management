import { HomeController } from "../../../application/controllers/WebView/HomeController";
import { HomeUseCase } from "../../../domain/useCases/WebView/Home/HomeUseCase";
import { FindAllDevicesFactory } from "../Device/FindAllDevicesFactory";

export const HomeFactory = () => {
  const findAllDevices = FindAllDevicesFactory().useCase;

  const useCase = new HomeUseCase(findAllDevices);

  const controller = new HomeController(useCase);

  return controller;
}