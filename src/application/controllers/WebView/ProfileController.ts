import { Request, Response } from "express";
import { Controller } from "../Controller";

export class ProfileController extends Controller{
  constructor(){ super() }

  async handle(request: Request, response: Response){
    this.init(request, response, true);

    const section = request.query?.section;

    return this.view('user/profile.ejs', {
      data: { section }
    });
  }
}