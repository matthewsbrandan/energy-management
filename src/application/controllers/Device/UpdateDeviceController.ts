import { Request, Response } from "express";
import { Controller } from "../Controller";
import { UpdateDeviceUseCase } from "../../../domain/useCases/Device/UpdateDevice/UpdateDeviceUseCase";

export class UpdateDeviceController extends Controller{
  constructor(
    private useCase: UpdateDeviceUseCase
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