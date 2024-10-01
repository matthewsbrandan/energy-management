import { Request, Response } from "express";
import { Controller } from "../Controller";
import { PageSyncDeviceUseCase } from "../../../domain/useCases/WebView/PageSyncDevice/PageSyncDeviceUseCase";

export class PageSyncDeviceController extends Controller{
  constructor(
    private useCase: PageSyncDeviceUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    const isAuth = this.init(request, response, true);
    if(!isAuth) return this.redirectUnauthenticated();
    
    const data = await this.useCase.execute({ user: this.auth_user });
    return this.view('device/sync.ejs', { data });
  }
}