import { Request, Response } from "express";
import { Controller } from "../Controller";
import { FindByIdDeviceTypeUseCase } from "../../../domain/useCases/DeviceType/FindByIdDeviceType/FindByIdDeviceTypeUseCase";

export class FindByIdDeviceTypeController extends Controller{
  constructor(
    private useCase: FindByIdDeviceTypeUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const { id } = request.params;
      const data = await this.useCase.execute(id);

      return response.status(200).json({
        result: true,
        response: "Tipo de dispositivo encontrado",
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