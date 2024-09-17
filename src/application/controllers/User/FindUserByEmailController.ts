import { Request, Response } from "express";
import { Controller } from "../Controller";
import { FindUserByEmailUseCase } from "../../../domain/useCases/User/FindUserByEmail/FindUserByEmailUseCase";

export class FindUserByEmailController extends Controller{
  constructor(
    private useCase: FindUserByEmailUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const { options, email } = request.body;

      const data = await this.useCase.execute({
        options,
        email
      });

      return response.status(200).json({
        result: true,
        response: "Usuário localizado",
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