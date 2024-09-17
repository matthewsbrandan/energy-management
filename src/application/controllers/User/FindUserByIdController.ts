import { Request, Response } from "express";
import { Controller } from "../Controller";
import { FindUserByIdUseCase } from "../../../domain/useCases/User/FindUserById/FindUserByIdUseCase";

export class FindUserByIdController extends Controller{
  constructor(
    private useCase: FindUserByIdUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const { id } = request.params;
      const data = await this.useCase.execute(id);

      return response.status(200).json({
        result: true,
        response: "Usuário encontrado com sucesso",
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