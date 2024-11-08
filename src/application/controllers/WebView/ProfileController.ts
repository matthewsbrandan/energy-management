import { Request, Response } from "express";
import { Controller } from "../Controller";
import { ProfileUseCase } from "../../../domain/useCases/WebView/Profile/ProfileUseCase";

export class ProfileController extends Controller{
  constructor(
    private useCase : ProfileUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    const isAuth = this.init(request, response, true);
    if(!isAuth) return this.redirectUnauthenticated();

    const metrics = await this.useCase.execute({
      user: this.auth_user
    })   

    const section = request.query?.section;

    return this.view('user/profile.ejs', {
      data: { section, metrics }
    });
  }
}