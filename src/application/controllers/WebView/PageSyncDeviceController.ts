import { Request, Response } from "express";
import { Controller } from "../Controller";
import { PageSyncDeviceUseCase } from "../../../domain/useCases/WebView/PageSyncDevice/PageSyncDeviceUseCase";

export class PageSyncDeviceController extends Controller{
  constructor(
    private useCase: PageSyncDeviceUseCase
  ){ super() }

  async handle(request: Request, response: Response){
    this.init(request, response, true);

    return this.view('device/sync.ejs');
  }
}