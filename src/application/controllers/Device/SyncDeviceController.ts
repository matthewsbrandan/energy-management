import { Request, Response } from "express";
import { Controller } from "../Controller";
import { SyncDeviceUseCase } from "../../../domain/useCases/Device/SyncDevice/SyncDeviceUseCase";
import { route } from "../../../infra/routes/routenames";

export class SyncDeviceController extends Controller{
  constructor(
    private useCase: SyncDeviceUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    const isAuth = this.init(request, response, true);
    if(!isAuth) return this.redirectUnauthenticated();

    const { id } = request.params;

    try {      
      await this.useCase.execute({ id, user: this.auth_user });

      return this.redirectWithMessage(
        route.home(),
        'success',
        'Dispositivo sincronizado com sucesso'
      );
    } catch (error) {
      return this.redirectWithMessage(
        route.home(),
        'error',
        error.message ??  'Não foi possível sincronizar este dispositivo'
      );
    }
  }
}