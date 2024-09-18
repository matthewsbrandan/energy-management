import { Request, Response } from "express";
import { Controller } from "../Controller";
import { FindAllDevicesUseCase } from "../../../domain/useCases/Device/FindAllDevices/FindAllDevicesUseCase";

export class FindAllDevicesController extends Controller{
  constructor(
    private useCase: FindAllDevicesUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const data = await this.useCase.execute();

      return response.status(200).json({
        result: true,
        response: "Lista de dispositivos carregada com sucesso",
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