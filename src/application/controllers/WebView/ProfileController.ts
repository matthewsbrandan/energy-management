import { Request, Response } from "express";
import { Controller } from "../Controller";
import { ProfileUseCase } from "../../../domain/useCases/WebView/Profile/ProfileUseCase";

export class ProfileController extends Controller{
  constructor(
    private useCase: ProfileUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    this.init(request, response, true);

    return this.view('user/profile.ejs');
  }
}