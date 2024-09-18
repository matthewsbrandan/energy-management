import { Request, Response } from "express";
import { Controller } from "../Controller";
import { DeleteDeviceUseCase } from "../../../domain/useCases/Device/DeleteDevice/DeleteDeviceUseCase";

export class DeleteDeviceController extends Controller{
  constructor(
    private useCase: DeleteDeviceUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const data = await this.useCase.execute();

      return response.status(200).json({
        result: true,
        response: "Mensagem de sucesso",
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