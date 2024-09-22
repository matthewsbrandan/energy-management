import { Request, Response } from "express";
import { Controller } from "../Controller";
import { CreateUserUseCase } from "../../../domain/useCases/User/CreateUser/CreateUserUseCase";

export class CreateUserController extends Controller{
  constructor(
    private useCase: CreateUserUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    try {
      const { name, email, password } = request.body;

      const data = await this.useCase.execute({ name, email, password });

      return response.status(200).json({
        result: true,
        response: "Conta criada com sucesso",
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