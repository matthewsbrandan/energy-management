import { Request, Response } from "express";
import { Controller } from "../Controller";
import { StoreDeviceUseCase } from "../../../domain/useCases/Device/StoreDevice/StoreDeviceUseCase";

export class StoreDeviceController extends Controller{
  constructor(
    private useCase: StoreDeviceUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      // [ ] PEGAR O IP DA REQUEST
      const {
        ip,
        type,
        data,
        description,
        state,
        subgroup,
        title
      } = request.body;

      const resData = await this.useCase.execute({
        ip,
        type,
        data,
        description,
        state,
        subgroup,
        title
      });

      return response.status(200).json({
        result: true,
        response: "Dispositivo adicionado com sucesso",
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