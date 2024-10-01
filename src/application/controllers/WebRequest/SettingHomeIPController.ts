import { Request, Response } from "express";
import { Controller } from "../Controller";
import { SettingHomeIPUseCase } from "../../../domain/useCases/WebRequest/SettingHomeIP/SettingHomeIPUseCase";
import { route } from "../../../infra/routes/routenames";

export class SettingHomeIPController extends Controller{
  constructor(
    private useCase: SettingHomeIPUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      this.init(request, response, true);
      
      await this.useCase.execute({
        user: this.auth_user,
        ip: request.ip
      });

      return this.redirectWithMessage(route.user.profile(), 'success', 'Home-IP Configurado com sucesso')
    } catch (error) {
      return this.redirectWithMessage(route.user.profile(), 'error', error.message)
    }
  }
}