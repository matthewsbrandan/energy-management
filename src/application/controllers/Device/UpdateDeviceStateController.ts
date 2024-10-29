import { Request, Response } from "express";
import { Controller } from "../Controller";
import { UpdateDeviceStateUseCase } from "../../../domain/useCases/Device/UpdateDeviceState/UpdateDeviceStateUseCase";

export class UpdateDeviceStateController extends Controller{
  constructor(
    private useCase: UpdateDeviceStateUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const isAuth = this.init(request, response, true);
      if(!isAuth) throw new Error('Você não está autenticado');

      const { id } = request.params;
      const { mode, state } = request.body;

      const data = await this.useCase.execute({
        id, user: this.auth_user, mode, state
      });

      return response.status(200).json({
        result: true,
        response: "Estado do dispositivo alterado com sucesso",
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