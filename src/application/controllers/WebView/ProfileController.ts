import { Request, Response } from "express";
import { Controller } from "../Controller";

export class ProfileController extends Controller{
  constructor(){ super() }

  async handle(request: Request, response: Response){
    const isAuth = this.init(request, response, true);
    if(!isAuth) return this.redirectUnauthenticated();
    
    const section = request.query?.section;

    return this.view('user/profile.ejs', {
      data: { section }
    });
  }
}