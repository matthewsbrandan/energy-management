import { FindAllDeviceTypesController } from "../../../application/controllers/DeviceType/FindAllDeviceTypesController";
import { FindAllDeviceTypesUseCase } from "../../../domain/useCases/DeviceType/FindAllDeviceTypes/FindAllDeviceTypesUseCase";
import { DeviceTypeRepository } from "../../repositories/in-prisma/DeviceTypeRepository";

export const FindAllDeviceTypesFactory = () => {
  const deviceTypeRepo = new DeviceTypeRepository();

  const useCase = new FindAllDeviceTypesUseCase(
    deviceTypeRepo
  );

  const controller = new FindAllDeviceTypesController(useCase);

  return controller;
}