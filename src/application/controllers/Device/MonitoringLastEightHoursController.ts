import { Request, Response } from "express";
import { Controller } from "../Controller";
import { MonitoringLastEightHoursUseCase } from "../../../domain/useCases/Device/MonitoringLastEightHours/MonitoringLastEightHoursUseCase";

export class MonitoringLastEightHoursController extends Controller{
  constructor(
    private useCase: MonitoringLastEightHoursUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const isAuth = this.init(request, response, true);
      if(!isAuth) throw new  Error('É obrigatório estar autenticado');

      const { id } = request.params;
      const data = await this.useCase.execute({ id, user: this.auth_user });

      return response.status(200).json({
        result: true,
        response: "Últimas oito horas do dispositivo",
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