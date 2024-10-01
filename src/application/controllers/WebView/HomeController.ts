import { Request, Response } from "express";
import { Controller } from "../Controller";
import { HomeUseCase } from "../../../domain/useCases/WebView/Home/HomeUseCase";

export class HomeController extends Controller{
  constructor(
    private useCase: HomeUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    this.init(request, response)

    if(this.auth_user) return await this.homePage()
    else return this.landingPage()
  }
  private landingPage(){
    return this.view('welcome.ejs')
  }
  private async homePage(){
    const devices = await this.useCase.execute({
      ip: this.auth_user.home_ip,
      user_id: this.auth_user.id
    });

    return this.view('home/index.ejs', {
      data: { devices }
    })
  }
}