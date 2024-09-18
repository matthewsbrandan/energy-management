import { Request, Response } from "express";
import { Controller } from "../Controller";
import { UpdateDeviceTypeUseCase } from "../../../domain/useCases/DeviceType/UpdateDeviceType/UpdateDeviceTypeUseCase";

export class UpdateDeviceTypeController extends Controller{
  constructor(
    private useCase: UpdateDeviceTypeUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const { id } = request.params;
      const { name, data } = request.body;

      const resData = await this.useCase.execute({ id, name, data });

      return response.status(200).json({
        result: true,
        response: "Tipo de dispositivo atualizado com sucesso",
        data: resData
      })
    } catch (error) {
      return response.status(500).json({
        result: false,
        response: error.message
      })
    }
  }
}