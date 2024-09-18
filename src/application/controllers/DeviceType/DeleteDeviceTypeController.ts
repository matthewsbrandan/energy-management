import { Request, Response } from "express";
import { Controller } from "../Controller";
import { DeleteDeviceTypeUseCase } from "../../../domain/useCases/DeviceType/DeleteDeviceType/DeleteDeviceTypeUseCase";

export class DeleteDeviceTypeController extends Controller{
  constructor(
    private useCase: DeleteDeviceTypeUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const { id } = request.params;
      
      await this.useCase.execute(id);

      return response.status(200).json({
        result: true,
        response: "Tipo de dispositivo excluído com sucesso"
      })
    } catch (error) {
      return response.status(500).json({
        result: false,
        response: error.message
      })
    }
  }
}