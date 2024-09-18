import { Request, Response } from "express";
import { Controller } from "../Controller";
import { StoreDeviceTypeUseCase } from "../../../domain/useCases/DeviceType/StoreDeviceType/StoreDeviceTypeUseCase";

export class StoreDeviceTypeController extends Controller{
  constructor(
    private useCase: StoreDeviceTypeUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const { name, data } = request.body;

      const resData = await this.useCase.execute({ name, data });

      return response.status(200).json({
        result: true,
        response: "Tipo de dispositivo criado com sucesso",
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