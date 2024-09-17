import { Request, Response } from "express";
import { Controller } from "../Controller";
import { HomeUseCase } from "../../../domain/useCases/WebView/Home/HomeUseCase";

export class HomeController extends Controller{
  constructor(
    private useCase: HomeUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    this.init(request, response)

    try {
      const data = await this.useCase.execute();

      return this.view('welcome.ejs')
    } catch (error) {
      return response.status(500).json({
        result: false,
        response: error.message
      })
    }
  }
}