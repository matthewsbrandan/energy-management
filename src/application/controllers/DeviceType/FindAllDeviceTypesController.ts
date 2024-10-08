import { Request, Response } from "express";
import { Controller } from "../Controller";
import { FindAllDeviceTypesUseCase } from "../../../domain/useCases/DeviceType/FindAllDeviceTypes/FindAllDeviceTypesUseCase";

export class FindAllDeviceTypesController extends Controller{
  constructor(
    private useCase: FindAllDeviceTypesUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const data = await this.useCase.execute();

      return response.status(200).json({
        result: true,
        response: "Tipos de dispositivos carregados com sucesso",
        data
      })
    } catch (error) {
      return response.status(500).json({
        result: false,
        response: error.message
      })
    }
  }
}