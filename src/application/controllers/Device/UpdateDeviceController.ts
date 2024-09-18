import { Request, Response } from "express";
import { Controller } from "../Controller";
import { UpdateDeviceUseCase } from "../../../domain/useCases/Device/UpdateDevice/UpdateDeviceUseCase";

export class UpdateDeviceController extends Controller{
  constructor(
    private useCase: UpdateDeviceUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const { id } = request.params;
      const {
        ip,
        type,
        data,
        description,
        state,
        status,
        subgroup,
        title
      } = request.body;

      const resData = await this.useCase.execute(id, {
        ip,
        type,
        data,
        description,
        state,
        status,
        subgroup,
        title
      });

      return response.status(200).json({
        result: true,
        response: "Dispositivo atualizado com sucesso",
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